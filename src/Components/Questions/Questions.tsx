import { QuestionPageType, QuestionsType } from "../../http/models/api/question";
import Question from "./Question/Question";

type Props = QuestionPageType & {
  openPage: (idParent: string, page: number, portionsSize: number, nameParent: string) => void,
  openImg: (src: string) => void,
  redactAsk: (model: QuestionsType) => void,
  testStart: (id: string, title: string, type: string) => void,
  portionsSize: number,
  deleteAsk: (id: string, name: string) => void,
};

const Questions: React.FC<Props> = ({ openPage, openImg, redactAsk, testStart, questions, portionsSize, deleteAsk }) => {
  const _openPage = (id: string, portionsSize: number, name: string) => {
    openPage(id, 1, portionsSize, name)
  }

  let Questions = questions?.map((question: QuestionsType) => {
    return <Question key={question.id} question={question} openPage={_openPage} portionsSize={portionsSize} testStart={testStart} openImg={openImg} redactAsk={redactAsk} deleteAsk={deleteAsk} />
  });

  return <>
    {Questions}
  </>
}

export default Questions;