const Message = require("../models/Message");
const User = require("../models/User");
const Case = require("../models/Case");
const { uploadToCloudinary } = require("../utils/uploadToCloudinary");

exports.addMessage = async (req, res) => {
  try {
    const { message, from, to } = req.body;

    const getUser = onlineUsers ? onlineUsers.get(to) : null;

    if (message && from && to) {
      const newMessage = await Message.create({
        sender: from,
        receiver: to,
        message: message,
        status: getUser ? "delivered" : "sent",
      }).then((message) => message.populate(["sender", "receiver"]));

      //update sender's sent Messages
      await User.findByIdAndUpdate(from, {
        $push: {
          sentMessages: newMessage._id,
        },
      });

      //update receiver's received Messages
      await User.findByIdAndUpdate(to, {
        $push: {
          receivedMessages: newMessage._id,
        },
      });

      return res.status(200).json({
        success: true,
        result: "Message added successfully",
        message: newMessage,
      });
    }

    return res.status(400).json({
      success: false,
      message: "All fields are required",
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: "Error while adding message",
      error: error.message,
    });
  }
};

exports.getMessages = async (req, res) => {
  try {
    const { from, to } = req.params;
    const messages = await Message.find({
      $or: [
        { sender: from, receiver: to },
        { sender: to, receiver: from },
      ],
    })
      .populate(["sender", "receiver"])
      .sort({ _id: 1 });

    const unreadMessages = [];

    messages.forEach((message, index) => {
      if (message.status !== "read" && message.sender._id.toString() === to) {
        messages[index].status = "read";
        unreadMessages.push(message._id);
      }
    });

    await Message.updateMany(
      { _id: { $in: unreadMessages } },
      { $set: { status: "read" } }
    );

    return res.status(200).json({
      success: true,
      result: "Messages fetched successfully",
      messages,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error while getting messages",
      error: error.message,
    });
  }
};

exports.addImageMessage = async (req, res) => {
  try {
    const { from, to } = req.query;

    console.log("from: ", from);
    console.log("to: ", to);

    console.log("req.files: ", req);

    if (req.files) {
      console.log(req.files.file);
      const date = Date.now();
      const getUser = onlineUsers ? onlineUsers.get(to) : null;

      if (from && to) {
        // Determine the type based on the file extension
        const doc = req.files.file;
        const fileType = doc.name.endsWith(".pdf") ? "file" : "image";


        const fileName = await uploadToCloudinary(doc, process.env.FOLDER_NAME);

        console.log("fileUploaded🎉 ", fileName);

        const message = await Message.create({
          sender: from,
          receiver: to,
          message: fileName.secure_url,
          type: fileType, // Use the determined file type
          status: getUser ? "delivered" : "sent",
        }).then((message) => message.populate(["sender", "receiver"]));

        // Update sender's sentMessages
        await User.findByIdAndUpdate(from, {
          $push: { sentMessages: message._id },
        });

        // Update receiver's receivedMessages
        await User.findByIdAndUpdate(to, {
          $push: { receivedMessages: message._id },
        });

        return res.status(200).json({
          success: true,
          result: "Image added successfully",
          message,
        });
      }

      return res.status(400).json({
        success: false,
        error: "All fields are required",
      });
    }
    return res.status(400).json({
      success: false,
      error: "Image is Required",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

exports.getInitialContactsWithMessages = async (req, res) => {
  try {
    const userId = req.params.from;

    const user = await User.findOne({ _id: userId })
      .populate({
        path: "sentMessages",
        populate: [{ path: "receiver" }, { path: "sender" }],
        options: { sort: { createdAt: -1 } },
      })
      .populate({
        path: "receivedMessages",
        populate: [{ path: "receiver" }, { path: "sender" }],
        options: { sort: { createdAt: -1 } },
      });

    const messages = [...user.sentMessages, ...user.receivedMessages];

    messages.sort((a, b) => {
      return b.createdAt.getTime() - a.createdAt.getTime();
    });

    const users = new Map();
    const messageStatusChange = [];

    messages.forEach((msg) => {
      // Ensure consistent ID comparison by stringifying
      const senderId = msg.sender._id.toString();
      const receiverId = msg.receiver._id.toString();
      const userIdStr = userId.toString();

      const isSender = senderId === userIdStr;
      // Consistent key format using string IDs
      const calculatedId = isSender ? receiverId : senderId;

      console.log("message:", msg);
      if (msg.status === "sent") {
        messageStatusChange.push(msg._id);
      }

      if (!users.get(calculatedId)) {
        const { id, type, message, status, createdAt, sender, receiver } = msg;

        let user = {
          messageId: id,
          type,
          message,
          status,
          createdAt,
          sender,
          receiver,
        };

        if (isSender) {
          user = {
            ...user,
            ...msg.receiver,
            totalUnreadMessages: 0,
          };
        } else {
          user = {
            ...user,
            ...msg.sender,
            totalUnreadMessages: status !== "read" ? 1 : 0,
          };
        }

        users.set(calculatedId, {
          ...user,
          _id: calculatedId,
        });
      } else if (msg.status !== "read" && !isSender) {
        const user = users.get(calculatedId);
        users.set(calculatedId, {
          ...user,
          _id: calculatedId,
          totalUnreadMessages: user.totalUnreadMessages + 1,
        });
      }
    });

    if (messageStatusChange.length > 0) {
      await Message.updateMany(
        { _id: { $in: messageStatusChange } },
        { $set: { status: "delivered" } }
      );
    }
    return res.status(200).json({
      success: true,
      result: "Messages fetched successfully",
      users: Array.from(users.values()),
      onlineUsers: Array.from(onlineUsers.keys()),
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

exports.getAllClients = async (req, res) => {
  console.log("getAllClients");
  try {
    console.log("before")
    const userId = req.user.id;
    console.log("after")

    console.log("user: ", userId)
    // Find the user and populate their cases
    const userCases = await User.findById(userId).populate('cases'); 
    
    //retrive caseId only
    const caseIds = userCases.cases.map((caseItem) => caseItem._id);

    //find such users whos role is client and contains any of these cases
    const clients = await User.find({
      cases: { $in: caseIds },
      _id: { $ne: userId }
    });

    const usersGrupedByInitialLetter = {}

    clients.forEach(client => {
      const initialLetter = client.firstName.charAt(0).toUpperCase();
      if (usersGrupedByInitialLetter[initialLetter]) {
        usersGrupedByInitialLetter[initialLetter].push(client)
      } else {
        usersGrupedByInitialLetter[initialLetter] = [client]
      }
    })

    //return the clients
    res.status(200).json({
      success: true,
      result: "Clients fetched successfully",
      users: usersGrupedByInitialLetter,
    });

  }
  catch(error) {
    res.status(500).json({
      success: false,
      error: "Something went wrong while getting all clients",
    });
  }
}