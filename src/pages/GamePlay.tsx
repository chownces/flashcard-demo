import { Button, Card, Flex, Form, InputNumber, Layout, Statistic } from "antd";
import { useRef, useState } from "react";
import IFlashcardEngine from "../model/flashcardEngine/IFlashcardEngine";
import { useForm } from "antd/es/form/Form";
import FlashcardEngine from "../model/flashcardEngine/FlashcardEngine";
import IFlashcardGenerator from "../model/flashcardGenerator/IFlashcardGenerator";

type GameAnswerFieldType = {
  answer?: number;
};

type GamePlayProps = {
  selectedDelegatee: () => IFlashcardGenerator;
};

const GamePlay: React.FC<GamePlayProps> = ({ selectedDelegatee }) => {
  const [form] = useForm();
  const model: React.MutableRefObject<IFlashcardEngine> = useRef(
    new FlashcardEngine(selectedDelegatee()),
  );
  const [currentFlashcardDetails, setCurrentFlashcardDetails] = useState(() =>
    model.current.nextQuestion(),
  );
  const [score, setScore] = useState(model.current.getScore());

  const handleAnswer = (fields: GameAnswerFieldType) => {
    const answer =
      fields.answer === undefined ? undefined : String(fields.answer);
    model.current.answer(answer);

    setScore(model.current.getScore());
    setCurrentFlashcardDetails(model.current.nextQuestion());
    form.resetFields();
  };

  return (
    <Layout style={{ padding: 10 }}>
      <Statistic title="Score" value={score} />
      <Flex gap="middle" justify="center">
        {currentFlashcardDetails &&
          currentFlashcardDetails.cards.map((card, idx) => (
            <Card key={idx}>
              <p>{card}</p>
            </Card>
          ))}
      </Flex>
      <p>{currentFlashcardDetails?.description}</p>
      <Form form={form} onFinish={handleAnswer}>
        <Form.Item<GameAnswerFieldType>
          name="answer"
          rules={[{ required: true, message: "Please input an answer!" }]}
        >
          <InputNumber size="large" autoFocus />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Answer
          </Button>
        </Form.Item>
      </Form>
    </Layout>
  );
};

export default GamePlay;
