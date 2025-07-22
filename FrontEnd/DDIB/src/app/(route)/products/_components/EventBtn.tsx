"use client";

import styles from "./eventBtn.module.scss";
import TimeCount from "@/app/components/TimeCount";
import { timerStore } from "@/app/store/product";

interface Props {
  joinBuy: () => void;
  over: boolean;
  startTime: string;
  id: number;
}

export default function EventBtn({ joinBuy, over, startTime, id }: Props) {
  const { timerOn } = timerStore();
  const status = timerOn[id];

  return (
    <>
      {over ? (
        <div className={styles.end}>
          <div>타임딜이 종료되었습니다.</div>
        </div>
      ) : (
        <>
          {!timerOn ? (
            <>
              <div
                className={styles.joinBuy}
                onClick={() => {
                  joinBuy(status);
                }}
              >
                <div>
                  <TimeCount startTime={startTime} id={id} />
                </div>
              </div>
            </>
          ) : (
            <>
              <div
                className={styles.waitBuy}
                onClick={() => {
                  joinBuy(status);
                }}
              >
                <div>
                  <TimeCount startTime={startTime} id={id} />
                </div>
              </div>
            </>
          )}
        </>
      )}
    </>
  );
}
