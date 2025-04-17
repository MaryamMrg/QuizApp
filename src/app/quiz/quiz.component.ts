import { Component, OnInit } from '@angular/core';
import { QuizService } from '../quiz.service';
import { ActivatedRoute } from '@angular/router';

interface QuizQuestion {
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
  
  selectedAnswer?: string | null;
  isCorrect?: boolean | null;
}

@Component({
  selector: 'app-quiz',
  standalone: true,
  imports: [],
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css']
})
export class QuizComponent implements OnInit {
  quizzes: QuizQuestion[] = [];
  loading = true;
  error: string | null = null;
  showResults = false;
  score=0;
  totalQuestion=0;
  showScore=false;

  constructor(
    private quizService: QuizService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.loadQuizzes();
  }

  loadQuizzes(): void {
    this.loading = true;
    this.error = null;
    
    this.quizService.getQuizzes().subscribe({
      next: (response) => {
        this.quizzes = response.results.map((quiz: any) => ({
          ...quiz,
          selectedAnswer: null,
          isCorrect: null
        }));
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Failed to load quizzes. Please try again.';
        this.loading = false;
      }
    });
  }

  getOptions(q: QuizQuestion): string[] {
    const options = [...q.incorrect_answers, q.correct_answer];
    return this.shuffleArray(options);
  }

  selectAnswer(question: QuizQuestion, answer: string): void {
    if (this.showResults) return; // Prevent changes after submission
    
    question.selectedAnswer = answer;
    question.isCorrect = answer === question.correct_answer;
  }

  submitQuiz(): void {
    this.showResults = true;
    this.showScore=true;
    this.totalQuestion=this.quizzes.length;
    this.score=this.quizzes.filter(q=>q.isCorrect).length;
  }
  getScoreMessage(): string {
    const percentage = (this.score / this.totalQuestion) * 100;
    
    if (percentage === 100) return "Perfect! 🎉";
    if (percentage >= 80) return "Excellent! 👏";
    if (percentage >= 60) return "Good job! 😊";
    if (percentage >= 40) return "Not bad! 👍";
    return "Keep practicing! 💪";
  }
  restartQuiz():void{
    this.showResults=false;
    this.showScore=false;
    this.score=0;
    this.quizzes.forEach(q=>{
      q.selectedAnswer=null;
      q.isCorrect=null;
    });
  }
  private shuffleArray(array: any[]): any[] {
    return array.sort(() => Math.random() - 0.5);
  }
}