const  log = require('./debugger');
const fs = require('fs');
const qs = require('./mdQuestionService');
const MarkdownIt = require('markdown-it');
const md = new MarkdownIt();


const mdFile = "D:/git/MohanLearningGround/src/main/md/FlashCards/Java9_to_11FlashCards.md"
const mdContent = fs.readFileSync(mdFile).toString();
const ast = md.parse(mdContent);
var zip = require('lodash/fp/zip')

log(zip([1,2,3],[3,2,1]))

//log(ast)
//log(mdContent);
// log(qs.parseQuestions(mdContent));
// log(qs.parseQuestionAt(1));
//log();
let questionIndices = qs.parseQuestionIndices(ast);
//log(questionIndices);
//let question = qs.parseQuestionAt(questions[questions.length-1], ast);
//log(question);
let answerEndIdices = qs.parseAnswerEndIndices(ast);
//log(answerEndIdices)

let rendererOption = {
  html:         true,     
  xhtmlOut:     false,            
  breaks:       false,     
  langPrefix:   'language-',
  linkify:      false,  
  typographer:  false,
  quotes: '“”‘’',
  highlight: function (/*str, lang*/) { return ''; }  
}


//log(zip(questionIndices,answerEndIdices))

let answerContentIndices = zip(questionIndices,answerEndIdices).map(elements => [ elements[0]+1,  elements[1]-1 - elements[0]+1 ])
log(answerContentIndices)

let answer = qs.parseContentRange(answerContentIndices[5][0], answerContentIndices[5][1], ast) 
log(md.renderer.render(answer, rendererOption))

// log("------------")
// answer = qs.parseContentRange(answerContentIndices[1][0], answerContentIndices[1][1], ast) 
// log(md.renderer.render(qs.getAnswerContentAt(1, ast), rendererOption))


// log("------------")
// answer = qs.parseContentRange(answerContentIndices[0][0], answerContentIndices[0][1], ast) 
// log(md.renderer.render(qs.getAnswerContentAt(5, ast), rendererOption))


log("------------")
log(qs.parseQuestionAt(0, ast))
answer = qs.parseContentRange(answerContentIndices[0][0], answerContentIndices[0][1], ast) 
log(md.renderer.render(qs.getAnswerContentAt(0, ast), rendererOption))

//answer.forEach(ast => log(ast.content))


/*
* Read file content
* Print number of questions
* print first question and it's answer
* print last question and it's answer
* print all questions
* print all answers
*/