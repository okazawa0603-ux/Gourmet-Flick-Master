import React, { useState, useEffect, useRef } from 'react';
import './App.css';
import { Trophy, RefreshCcw, Play, Sparkles, Volume2, VolumeX } from 'lucide-react';

interface FoodItem {
  kanji: string;
  kana: string;
}

const FOOD_DATA: FoodItem[] = [
  { kanji: "チーズカレー", kana: "ちーずかれー" },
  { kanji: "牛丼", kana: "ぎゅうどん" },
  { kanji: "カルボナーラ", kana: "かるぼなーら" },
  { kanji: "トマトシチュー", kana: "とまとしちゅー" },
  { kanji: "生姜焼き定食", kana: "しょうがやきていしょく" },
  { kanji: "ハンバーグ", kana: "はんばーぐ" },
  { kanji: "オムライス", kana: "おむらいす" },
  { kanji: "寿司", kana: "すし" },
  { kanji: "天ぷら定食", kana: "てんぷらていしょく" },
  { kanji: "親子丼", kana: "おやこどん" },
  { kanji: "豚骨ラーメン", kana: "とんこつらーめん" },
  { kanji: "味噌ラーメン", kana: "みそらーめん" },
  { kanji: "塩ラーメン", kana: "しおらーめん" },
  { kanji: "つけ麺", kana: "つけめん" },
  { kanji: "焼きそば", kana: "やきそば" },
  { kanji: "お好み焼き", kana: "おこのみやき" },
  { kanji: "たこ焼き", kana: "たこやき" },
  { kanji: "唐揚げ定食", kana: "からあげていしょく" },
  { kanji: "チキン南蛮", kana: "ちきんなんばん" },
  { kanji: "エビフライ定食", kana: "えびふらいていしょく" },
  { kanji: "刺身定食", kana: "さしみていしょく" },
  { kanji: "焼き魚定食", kana: "やきざかなていしょく" },
  { kanji: "うどん", kana: "うどん" },
  { kanji: "ざるそば", kana: "ざるそば" },
  { kanji: "牛カルビ焼肉", kana: "ぎゅうかるびやきにく" },
  { kanji: "石焼ビビンバ", kana: "いしやきびびんば" },
  { kanji: "冷麺", kana: "れいめん" },
  { kanji: "小籠包", kana: "しょうろんぽう" },
  { kanji: "餃子定食", kana: "ぎょうざていしょく" },
  { kanji: "麻婆豆腐", kana: "まーぼーどうふ" },
  { kanji: "エビチリ", kana: "えびちり" },
  { kanji: "回鍋肉", kana: "ほいこーろー" },
  { kanji: "酢豚", kana: "すぶた" },
  { kanji: "青椒肉絲", kana: "ちんじゃおろーす" },
  { kanji: "チャーハン", kana: "ちゃーはん" },
  { kanji: "天津飯", kana: "てんしんはん" },
  { kanji: "中華丼", kana: "ちゅうかどん" },
  { kanji: "八宝菜", kana: "はっぽうさい" },
  { kanji: "ちゃんぽん", kana: "ちゃんぽん" },
  { kanji: "担々麺", kana: "たんたんめん" },
  { kanji: "ドリア", kana: "どりあ" },
  { kanji: "グラタン", kana: "ぐらたん" },
  { kanji: "ピザ", kana: "ぴざ" },
  { kanji: "マルゲリータ", kana: "まるげりーた" },
  { kanji: "ペペロンチーノ", kana: "ぺぺろんちーの" },
  { kanji: "ボロネーゼ", kana: "ぼろねーぜ" },
  { kanji: "ジェノベーゼ", kana: "じぇのべーぜ" },
  { kanji: "ハンバーガー", kana: "はんばーがー" },
  { kanji: "チーズバーガー", kana: "ちーずばーがー" },
  { kanji: "フライドポテト", kana: "ふらいどぽてと" },
  { kanji: "サンドイッチ", kana: "さんどいっち" },
  { kanji: "クラブハウスサンド", kana: "くらぶはうすさんど" },
  { kanji: "パンケーキ", kana: "ぱんけーき" },
  { kanji: "フレンチトースト", kana: "ふれんちとーすと" },
  { kanji: "ホットケーキ", kana: "ほっとけーき" },
  { kanji: "オムレツ", kana: "おむれつ" },
  { kanji: "スクランブルエッグ", kana: "すくらんぶるえっぐ" },
  { kanji: "エッグベネディクト", kana: "えっぐべねでぃくと" },
  { kanji: "ビーフシチュー", kana: "びーふしちゅー" },
  { kanji: "クリームシチュー", kana: "くりーむしちゅー" },
  { kanji: "ポトフ", kana: "ぽとふ" },
  { kanji: "ミネストローネ", kana: "みねすとろーね" },
  { kanji: "コーンスープ", kana: "こーんすーぷ" },
  { kanji: "クラムチャウダー", kana: "くらむちゃうだー" },
  { kanji: "ポークチャップ", kana: "ぽーくちゃっぷ" },
  { kanji: "ロールキャベツ", kana: "ろーるきゃべつ" },
  { kanji: "ステーキ", kana: "すてーき" },
  { kanji: "ローストビーフ", kana: "ろーすとびーふ" },
  { kanji: "ロコモコ", kana: "ろこもこ" },
  { kanji: "タコライス", kana: "たこらいす" },
  { kanji: "ガパオライス", kana: "がぱおらいす" },
  { kanji: "ナシゴレン", kana: "なしごれん" },
  { kanji: "フォー", kana: "ふぉー" },
  { kanji: "グリーンカレー", kana: "ぐりーんかれー" },
  { kanji: "パエリア", kana: "ぱえりあ" },
  { kanji: "ブイヤベース", kana: "ぶいやべーす" },
  { kanji: "アクアパッツァ", kana: "あくあぱっつぁ" },
  { kanji: "シュラスコ", kana: "しゅらすこ" },
  { kanji: "ケバブ", kana: "けばぶ" },
  { kanji: "タコス", kana: "たこす" },
  { kanji: "ナポリタン", kana: "なぽりたん" },
  { kanji: "明太子パスタ", kana: "めんたいこぱすた" },
  { kanji: "たらこスパゲティ", kana: "たらこすぱげてぃ" },
  { kanji: "焼き鳥", kana: "やきとり" },
  { kanji: "カツ丼", kana: "かつどん" },
  { kanji: "天丼", kana: "てんどん" },
  { kanji: "海鮮丼", kana: "かいせんどん" },
  { kanji: "ネギトロ丼", kana: "ねぎとろどん" },
  { kanji: "カツカレー", kana: "かつかれー" },
  { kanji: "スープカレー", kana: "すーぷかれー" },
  { kanji: "キーマカレー", kana: "きーまかれー" },
  { kanji: "欧風カレー", kana: "おうふうかれー" },
  { kanji: "ハヤシライス", kana: "はやしらいす" },
  { kanji: "ビーフン", kana: "びーふん" },
  { kanji: "春巻き", kana: "はるまき" },
  { kanji: "シュウマイ", kana: "しゅうまい" },
  { kanji: "肉まん", kana: "にくまん" }
];

export default function App() {
  const [gameState, setGameState] = useState<'start' | 'playing' | 'gameover'>('start');
  const [score, setScore] = useState<number>(0);
  const [timeLeft, setTimeLeft] = useState<number>(60);
  const [currentWordIndex, setCurrentWordIndex] = useState<number>(0);
  const [shuffledFoods, setShuffledFoods] = useState<FoodItem[]>([]);
  const [inputVal, setInputVal] = useState<string>('');
  const [highScore, setHighScore] = useState<number>(0);
  const [combo, setCombo] = useState<number>(0);
  const [maxCombo, setMaxCombo] = useState<number>(0);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);

  // 入力欄の参照を取得（フォーカス操作用）
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const saved = localStorage.getItem('flick_game_highscore');
    if (saved) setHighScore(Number(saved));
  }, []);

  const startGame = () => {
    const shuffled = [...FOOD_DATA].sort(() => Math.random() - 0.5);
    setShuffledFoods(shuffled);
    setCurrentWordIndex(0);
    setScore(0);
    setTimeLeft(60);
    setInputVal('');
    setCombo(0);
    setMaxCombo(0);
    setGameState('playing');
    setTimeout(() => inputRef.current?.focus(), 100);
  };

  useEffect(() => {
    let timer: any;
    if (gameState === 'playing' && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0 && gameState === 'playing') {
      setGameState('gameover');
      setHighScore((prev) => {
        const newHigh = Math.max(prev, score);
        localStorage.setItem('flick_game_highscore', String(newHigh));
        return newHigh;
      });
    }
    return () => clearInterval(timer);
  }, [gameState, timeLeft, score]);

  const currentItem = shuffledFoods[currentWordIndex] || { kanji: "回鍋肉", kana: "ほいこーろー" };

  // カタカナ・ひらがな双方を正規化して判定
  const checkMatch = (val: string) => {
    const normalizedInput = val.trim().replace(/[\u30a1-\u30f6]/g, (match) =>
      String.fromCharCode(match.charCodeAt(0) - 0x60)
    );

    // 完全一致、または末尾に入力成功したフレーズが含まれているかチェック
    if (normalizedInput.endsWith(currentItem.kana)) {
      const newScore = score + 10;
      const newCombo = combo + 1;
      setScore(newScore);
      setCombo(newCombo);
      setMaxCombo((prev) => Math.max(prev, newCombo));
      
      // 未確定文字を消去するために一度入力欄をリセット
      setInputVal('');
      if (inputRef.current) {
        inputRef.current.blur();
        setTimeout(() => inputRef.current?.focus(), 10);
      }

      setCurrentWordIndex((prev) => (prev + 1) % shuffledFoods.length);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (gameState !== 'playing') return;
    const val = e.target.value;
    setInputVal(val);
    checkMatch(val);
  };

  return (
    <div className="game-wrapper polka-bg">
      <header className="header-card">
        <div className="logo-area">
          <Sparkles className="icon-sparkle" size={24} />
          <h1>グルメフリック王</h1>
        </div>
        <button onClick={() => setSoundEnabled(!soundEnabled)} className="icon-btn">
          {soundEnabled ? <Volume2 size={20} color="#0284c7" /> : <VolumeX size={20} color="#94a3b8" />}
        </button>
      </header>

      <main className="main-content">
        {gameState === 'start' && (
          <div className="card start-card">
            <div className="icon-badge">
              <Trophy size={40} color="#0284c7" />
            </div>
            <h2>60秒フリックバトル！</h2>
            <p className="description">
              出題される料理名の「ふりがな」をフリック入力しよう！<br />
              1フレーズ完成ごとに <strong>+10点！</strong>
            </p>
            <div className="tag">📱 Enterキー不要・連続入力対応</div>
            <button onClick={startGame} className="primary-btn">
              <Play size={22} fill="white" /> ゲームスタート
            </button>
          </div>
        )}

        {gameState === 'playing' && (
          <div className="playing-container">
            <div className="stats-grid">
              <div className="stat-box">
                <span className="stat-label">残り時間</span>
                <span className={`stat-val ${timeLeft <= 10 ? 'time-warning' : ''}`}>{timeLeft}s</span>
              </div>
              <div className="stat-box">
                <span className="stat-label">スコア</span>
                <span className="stat-val score-val">{score}</span>
              </div>
              <div className="stat-box">
                <span className="stat-label">コンボ</span>
                <span className="stat-val combo-val">{combo}</span>
              </div>
            </div>

            <div className="card word-card">
              <span className="question-num">第 {currentWordIndex + 1} 問 / 100問</span>
              
              <div className="ruby-display">
                <ruby className="target-word">
                  {currentItem.kanji}
                  <rt className="target-ruby">{currentItem.kana}</rt>
                </ruby>
              </div>

              <div className="input-display">{inputVal || <span className="placeholder">入力待機中...</span>}</div>
            </div>

            <input
              ref={inputRef}
              type="text"
              value={inputVal}
              onChange={handleInputChange}
              autoFocus
              className="text-input"
              placeholder="ここをタップしてフリック入力"
            />
          </div>
        )}

        {gameState === 'gameover' && (
          <div className="card result-card">
            <div className="icon-badge gold">
              <Trophy size={40} color="#f59e0b" />
            </div>
            <h2>ゲーム終了！</h2>
            <div className="result-details">
              <div className="result-row">
                <span>獲得スコア</span>
                <span className="final-score">{score} 点</span>
              </div>
              <div className="result-row sub">
                <span>最大コンボ</span>
                <strong>{maxCombo} コンボ</strong>
              </div>
              <div className="result-row sub border-t">
                <span>ハイスコア</span>
                <strong>{highScore} 点</strong>
              </div>
            </div>
            <button onClick={startGame} className="primary-btn">
              <RefreshCcw size={20} /> もう一度プレイ
            </button>
          </div>
        )}
      </main>

      <footer className="footer-text">
        グルメフリック王 © 2026 - Responsive Web App
      </footer>
    </div>
  );
}