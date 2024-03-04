import {
  Button,
  Card,
  Flex,
  Form,
  InputNumber,
  Layout,
  Modal,
  Statistic,
} from "antd";
import { useMemo, useRef, useState } from "react";
import IFlashcardEngine from "../model/flashcardEngine/IFlashcardEngine";
import { useForm } from "antd/es/form/Form";
import FlashcardEngine from "../model/flashcardEngine/FlashcardEngine";
import IFlashcardGenerator from "../model/flashcardGenerator/IFlashcardGenerator";
import Countdown from "react-countdown";

type GameAnswerFieldType = {
  answer?: number;
};

type GamePlayProps = {
  selectedDelegatee: () => IFlashcardGenerator;
  endGame: () => void;
};
const defaultGameTimeSeconds = 60;

const GamePlay: React.FC<GamePlayProps> = ({ selectedDelegatee, endGame }) => {
  const [form] = useForm();
  const model: React.MutableRefObject<IFlashcardEngine> = useRef(
    new FlashcardEngine(selectedDelegatee()),
  );
  const countdownTimerRef = useRef<Countdown>(null);
  const [currentFlashcardDetails, setCurrentFlashcardDetails] = useState(() =>
    model.current.nextQuestion(),
  );
  const [score, setScore] = useState(model.current.getScore());
  const [isTimesUpModalOpen, setIsTimesUpModalOpen] = useState(false);
  const [isWinModalOpen, setIsWinModalOpen] = useState(false);

  const handleAnswer = (fields: GameAnswerFieldType) => {
    const answer =
      fields.answer === undefined ? undefined : String(fields.answer);
    model.current.answer(answer);

    const nextFlashcard = model.current.nextQuestion();
    if (!nextFlashcard) {
      countdownTimerRef.current?.stop();
      setIsWinModalOpen(true);
      return;
    }

    setScore(model.current.getScore());
    setCurrentFlashcardDetails(nextFlashcard);
    form.resetFields();
  };

  const handleTimesUpModalOk = () => {
    setIsTimesUpModalOpen(false);
    endGame();
  };

  const handleWinModalOk = () => {
    setIsWinModalOpen(false);
    endGame();
  };

  const countdownComponent = useMemo(
    () => (
      <Countdown
        ref={countdownTimerRef}
        date={Date.now() + defaultGameTimeSeconds * 1000}
        onComplete={() => setIsTimesUpModalOpen(true)}
      />
    ),
    [],
  );

  const timeUpModal = (
    <Modal
      open={isTimesUpModalOpen}
      centered
      footer={[
        <Button key="ok" type="primary" onClick={handleTimesUpModalOk}>
          Ok
        </Button>,
      ]}
    >
      Times Up! <b>Score: {model.current.getScore()}</b>
    </Modal>
  );

  const winModal = (
    <Modal
      open={isWinModalOpen}
      centered
      footer={[
        <Button key="ok" type="primary" onClick={handleWinModalOk}>
          Ok
        </Button>,
      ]}
    >
      No more cards left! <b>Score: {model.current.getScore()}</b>
    </Modal>
  );

  const flashcards = (
    <Flex gap="middle" justify="center">
      {currentFlashcardDetails &&
        currentFlashcardDetails.cards.map((card, idx) => (
          <Card key={idx}>
            <p>{card}</p>
          </Card>
        ))}
    </Flex>
  );

  const answerForm = (
    <Form form={form} onFinish={handleAnswer}>
      <Form.Item<GameAnswerFieldType>
        name="answer"
        rules={[{ required: true, message: "Please input an answer!" }]}
      >
        <InputNumber
          size="large"
          autoFocus
          disabled={isTimesUpModalOpen || isWinModalOpen}
        />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Answer
        </Button>
      </Form.Item>
    </Form>
  );

  return (
    <Layout style={{ padding: 10 }}>
      <Statistic title="Score" value={score} />
      {flashcards}
      {countdownComponent}
      <p>{currentFlashcardDetails?.description}</p>
      {answerForm}
      {timeUpModal}
      {winModal}
    </Layout>
  );
};

export default GamePlay;
