"use client"
import { useState, useEffect } from "react";
import useFetch from "@/hooks/use-fetch";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
  import { BarLoader } from "react-spinners";
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { generateQuiz, saveQuizResults } from "@/actions/interview";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import QuizResult from "./quiz-result";

  

const Quiz = () => {

    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [answers, setAnswers] = useState([]);
    const [showExplanation, setShowExplanation] = useState(false);


    const {
        loading: generatingQuiz,
        fn: generateQuizFn,
        data: quizData,
      } = useFetch(generateQuiz);

      const{
        loading: savingResult,
        fn: saveQuizResultFn,
        data: resultData,
        setData: setResultData,
      } = useFetch(saveQuizResults);

      useEffect(() => {
        if (quizData) {
          setAnswers(new Array(quizData.length).fill(null));
        }
      }, [quizData]);

      const handelAnswer = (answer) => {
        const newAnswers = [...answers];
        newAnswers[currentQuestion] = answer;
        setAnswers(newAnswers);
      };

      const handelNext = () => {
        if (currentQuestion < quizData.length - 1) {
          setCurrentQuestion(currentQuestion + 1);
          setShowExplanation(false);
        } else {
          finishQuiz();
        }
      };
       const calculateScore =() => {
        let correct =0;
        answers.forEach((answer,index) => {
            if (answer === quizData[index].correctAnswer){
                correct ++;
            }
        });
        return (correct / quizData.length) * 100; //calculate percentage
       };

      const finishQuiz = async () => {
        const score = calculateScore();
        try {
            await saveQuizResultFn(quizData,answers,score,)
            toast.success("Quiz completed successfully");
        } catch (error) {
            toast.error(error.message || "Failed to save quiz results");
        }
      };

      const startNewQuiz = () => {
        setCurrentQuestion(0);
        setAnswers([]);
        setShowExplanation(false);
        generateQuizFn();
        setResultData(null);
      };

      if (generatingQuiz) {
        return <BarLoader className="mt-4" width={"100%"} color="gray" />;
      }

      //show  result if quiz is completed
      if (resultDate){
        return(
            <div className="mx-2">
                <QuizResult result={resultData} onStartNew={startNewQuiz}/>
            </div>
        );
      }

      if (!quizData){
        return (
            <Card className="mx-2">
            <CardHeader>
                <CardTitle>Ready to test your knowledge</CardTitle>
            </CardHeader>
            <CardContent>
                <p className="text-muted-foreground">
                    This quiz contains 10 questions specific to your industry and
                    skills. Take your time and choose the best answer for each question.
                </p>
            </CardContent>
            <CardFooter>
                <Button className="w-full" onClick={generateQuizFn}>Start Quiz</Button>              
            </CardFooter>
            </Card>

        );
      } 
     const question = quizData[currentQuestion];
        return  ( <Card className="mx-2">
        <CardHeader>
            <CardTitle>
                Question {currentQuestion + 1} of {quizData.length}
        </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
        <p className="text-lg font-medium">{question.question}</p>
        </CardContent>
        <RadioGroup 
            className="space-y-2"
            onvalueChange={handelAnswer}
            value={answers[currentQuestion]}
        >
            {question.option.map((option,index) => {
                  return (
                  <div className="flex items-center space-x-2" key={index}>
                  <RadioGroupItem value={option }id={`option-${index}`} />
                  <Label htmlFor={`option-${index}`}>{option }</Label>
                  </div>
                  );
            })}
        </RadioGroup>
        {showExplanation && 
        <div className="mt-4 p-4 bg-muted rounded-lg">
            <p className="font-medium">Explanation: </p>
            <p className="text-muted-foreground">{question.explanation}</p>
            </div>} 
    <CardFooter>
        {!showExplanation && (
            <Button onClick={() => setShowExplanation(true)}
            variant="outline"
            disabled= {!answers[currentQuestion]}
            >
            Show Explanation
            </Button>
        )}

        <Button
        onclick={handelNext}
        className="ml-auto"
        disabled={!answers[currentQuestion] || savingResult}
        >
            {savingResult && (
                <Loader2 className="mt-4" width={"100%"} color="gray" />
            )}
            {currentQuestion < quizData.length -1 
            ? "Next Question"
            : "Finish Quiz"}
        </Button>


    </CardFooter>
    </Card>
    
    );
};

export default Quiz;