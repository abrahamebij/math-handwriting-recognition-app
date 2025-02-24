export class QuestionGenerator {
  // Generates a random math question with an answer
  static generate() {
    const operators = ["+", "-", "*", "/"]; // Possible operators
    const operator = operators[Math.floor(Math.random() * operators.length)]; // Selects a random operator
    const num1 = Math.floor(Math.random() * 10) + 1; // Generates a random number between 1 and 10
    const num2 = Math.floor(Math.random() * 10) + 1; // Generates another random number between 1 and 10

    const question = `${num1} ${operator} ${num2}`; // Formats the question
    let answer;

    // Determines the correct answer based on the operator
    switch (operator) {
      case "+":
        answer = num1 + num2;
        break;
      case "-":
        answer = num1 - num2;
        break;
      case "*":
        answer = num1 * num2;
        break;
      case "/":
        answer = (num1 / num2).toFixed(2); // Ensures division result is rounded to 2 decimal places
        break;
    }

    return { question, answer: answer.toString() }; // Returns the question and answer
  }

  // Modifies an existing question by adjusting the numbers slightly
  static modify(question) {
    const parts = question.split(" "); // Splits the question into components
    const num1 = Number.parseInt(parts[0]); // Extracts first number
    const operator = parts[1]; // Extracts operator
    const num2 = Number.parseInt(parts[2]); // Extracts second number

    // Adjusts numbers randomly by up to ±2
    const newNum1 = num1 + Math.floor(Math.random() * 5) - 2;
    const newNum2 = num2 + Math.floor(Math.random() * 5) - 2;

    const newQuestion = `${newNum1} ${operator} ${newNum2}`; // Creates a new question
    let newAnswer;

    // Computes the new answer based on the modified numbers
    switch (operator) {
      case "+":
        newAnswer = newNum1 + newNum2;
        break;
      case "-":
        newAnswer = newNum1 - newNum2;
        break;
      case "*":
        newAnswer = newNum1 * newNum2;
        break;
      case "/":
        newAnswer = (newNum1 / newNum2).toFixed(2); // Ensures division result is rounded to 2 decimal places
        break;
    }

    return { question: newQuestion, answer: newAnswer.toString() }; // Returns the modified question and answer
  }
}
