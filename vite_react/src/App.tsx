import React, { useState } from 'react';

//
type DataTypes = string | number | boolean | Uint8Array;
interface WebUi {
  call(fn: string, ...args: DataTypes[]): Promise<DataTypes>;
}
declare let webui: WebUi;

enum Te { Guu = 0, Choki, Paa}
enum Judgment { Draw = 0, Win, Lose }
type ScoreType = {
  human: number,
  computer: number,
  judgment: Judgment
}

const Jyanken: React.FC = () => {
  const [scores, setScrores] = useState<ScoreType[]>([]);

  const pon = async (human: Te) => {
    const computer: Te = Math.floor(Math.random() * 3);
    const judgment = await webui.call('jyanken_judgment', computer, human);  //
    const score = {human: human, computer: computer, judgment: judgment as number};
    setScrores([score, ...scores]);
  }

  return (
    <>
      <h1>じゃんけん ポン！</h1>
      <JyankenBox actionPon={te => pon(te)} />
      <ScoreBox scores={scores} />
      <button id="exit">Exit</button>
    </>
   );
}

export default Jyanken;


type JyankenBoxProps = {
  actionPon: (te: number) => void
}
const JyankenBox: React.FC<JyankenBoxProps> = ({actionPon}) => {
  const divStyle: React.CSSProperties = {margin: "0 20px"};
  const buttonStyle: React.CSSProperties = {margin: "0 10px",
     padding: "3px 10px", fontSize: 14};
  return (
    <div style={divStyle}>
      <button onClick={() => actionPon(Te.Guu)} style={buttonStyle}>グー</button>
      <button onClick={() => actionPon(Te.Choki)} style={buttonStyle}>チョキ</button>
      <button onClick={() => actionPon(Te.Paa)} style={buttonStyle}>パー</button>
    </div>
  );
}


type ScoreListProps = {
  scores: ScoreType[]
}
const ScoreBox: React.FC<ScoreListProps> = ({scores}) => {
  const teString = ["グー","チョキ", "パー"];
  const judgmentString = ["引き分け","勝ち", "負け"];

  const tableStyle: React.CSSProperties = {marginTop: 20, borderCollapse: "collapse"};
  const thStyle: React.CSSProperties = {border: "solid 1px #888", padding: "3px 15px"};
  const tdStyle: React.CSSProperties = {border: "solid 1px #888", padding: "3px 15px",
      textAlign: "center"};
  return (
    <table style={tableStyle}>
      <thead>
        <tr>
          <th style={thStyle}>あなた</th>
          <th style={thStyle}>コンピュター</th>
          <th style={thStyle}>勝敗</th>
        </tr>
      </thead>
      <tbody>
        {scores.map((scrore, ix) =>
          <tr key={ix}>
            <td style={tdStyle}>{teString[scrore.human]}</td>
            <td style={tdStyle}>{teString[scrore.computer]}</td>
            <td style={tdStyle}>{judgmentString[scrore.judgment]}</td>
          </tr>
        )}
      </tbody>
    </table>
  );
}
