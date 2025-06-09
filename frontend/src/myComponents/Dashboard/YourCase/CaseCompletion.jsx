import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Check, StarIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { useNavigate } from "react-router"
import { useSelector } from "react-redux"
import { completeCase } from "@/services/operations/caseAPI"

export default function CaseCompletion({caseData}) {

    
    const [rating, setRating] = useState(0)
    const [feedback, setFeedback] = useState("")
    const [isCompleted, setIsCompleted] = useState(false)
    const navigate = useNavigate();
  const token = useSelector((state) => state.auth.token);
  const {user} = useSelector((state) => state.profile);
  
  
  const handleComplete = () => {
    setIsCompleted(true)
    // You could add API calls here to submit the rating and feedback
    const res = completeCase(token, caseData._id, rating, feedback, navigate);
    console.log(res);
    setRating(0);
    setFeedback("");
  }

  return (
    <div className="container max-w-3xl mx-auto px-4 py-12">
      <AnimatePresence>
        {isCompleted ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center justify-center h-[60vh]"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{
                type: "spring",
                stiffness: 260,
                damping: 20,
                delay: 0.2,
              }}
              className="w-24 h-24 rounded-full bg-black flex items-center justify-center mb-6"
            >
              <Check className="w-12 h-12 text-white" />
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="text-3xl font-bold mb-2"
            >
              Case Completed
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="text-gray-500 text-center"
            >
              Thank you for your feedback. Your case has been successfully closed.
            </motion.p>
          </motion.div>
        ) : (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
            {/* Case Summary */}
            <Card className="mb-8 border-none shadow-lg">
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold mb-6">Case Summary</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Case ID</p>
                    <p className="font-medium text-lg">{caseData._id}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Client Name</p>
                    <p className="font-medium text-lg">{user?.firstName} {user?.lastName}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Service Provider</p>
                    <p className="font-medium text-lg">{caseData?.serviceProvider?.firstName} {caseData?.serviceProvider?.lastName}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Rating System */}
            <Card className="mb-10 border-none shadow-lg">
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold mb-6">Rate Your Experience</h2>
                <div className="flex items-center mb-6">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <motion.button
                      key={star}
                      onClick={() => setRating(star)}
                      className="focus:outline-none mr-2"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <StarIcon className={`w-10 h-10 ${rating >= star ? "fill-black text-black" : "text-gray-300"}`} />
                    </motion.button>
                  ))}
                  <span className="ml-3 text-sm text-gray-500">
                    {rating > 0 ? `${rating} out of 5` : "Select a rating"}
                  </span>
                </div>
                <div>
               
                  <Textarea
                    id="feedback"
                    placeholder="Share your thoughts about our service..."
                    value={feedback}
                    onChange={(e) => setFeedback(e.target.value)}
                    className="w-full border-gray-200 focus:border-black focus:ring-black text-base"
                    rows={4}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Action Button */}
            <div className="flex justify-center">
              <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                <Button
                  onClick={handleComplete}
                  className="bg-black text-white hover:bg-gray-800 text-lg py-6 px-10 rounded-lg"
                >
                  Complete Case
                </Button>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
