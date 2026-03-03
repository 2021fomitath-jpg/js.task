/*--------------------------------------------------
ストップウォッチ　変数
・経過した時間を保存する箱
・ストップを押したときの戻り値
・数字を表示する箇所の指定
---------------------------------------------------*/
let TimeCount = 0;
let StopCount = null;
/*--------------------------------------------------
ストップウォッチ　定数
・数字を表示する箇所の指定
・秒数を保管する箱
・分数を保管する箱
・時数を保管する箱
・インターバルの間隔を指定する箱
---------------------------------------------------*/
const TimeDispay = $(".display");
const Second_Per_CentiSecond = 100;
const Minute_per_Second = 60;
const Hour_Per_Minute = 60;
const Interval_MS = 10;
/*--------------------------------------------------
ストップウォッチ　関数
・スタートを押したら始まる
・ストップを押したら始まる
・リセットを押したら始まる
---------------------------------------------------*/
function Start(){
  if(StopCount===null){
    StopCount = setInterval(function(){
      TimeCount++;
      let Centiseconds = TimeCount%Second_Per_CentiSecond;
      if(Centiseconds<10){
        Centiseconds = "0"+Centiseconds.toString();
      }
      let Seconds = Math.floor(TimeCount/Second_Per_CentiSecond)%Minute_per_Second;
      if(Seconds<10){
        Seconds = "0"+Seconds.toString();
      }
      let Minutes = Math.floor(TimeCount/(Second_Per_CentiSecond*Minute_per_Second))%Hour_Per_Minute;
      if(Minutes<10){
        Minutes = "0"+Minutes.toString();
      }
      let Hours = Math.floor(TimeCount/(Second_Per_CentiSecond*Minute_per_Second*Hour_Per_Minute));
      if(Hours<10){
        Hours = "0"+Hours.toString();
      }
      TimeDispay.text(Hours+":"+Minutes+":"+Seconds+","+Centiseconds);
      $(".start").css("background-color","#333");
    }, Interval_MS);
  };
};
function Stop(){
  if(StopCount!==null){
    clearInterval(StopCount);
    StopCount = null;
    $(".start").css("background-color","#e0e0e0");
  };
};
function Reset(){
  clearInterval(StopCount);
  StopCount = null;
  TimeCount = 0;
  TimeDispay.text("00:00:00,00");
  $(".start").css("background-color","#e0e0e0");
};
/*--------------------------------------------------
電卓　変数
・今の数値を保存する箱
・計算過程を保存する箱
・最後に押されたボタンの判断
---------------------------------------------------*/
let current = "0"
let progress = ""
let lastInput = ""
/*--------------------------------------------------
電卓　定数
・数字を教示する箇所の指定
・データ要素を集めて保管する箱
---------------------------------------------------*/
const ResultDisplay = $(".result")
const NumButton = document.querySelectorAll("[data-number]")
const OpeButton = document.querySelectorAll("[data-operator]")
const PointButton = document.querySelector("[data-point]")
const ClearButton = document.querySelector("[data-clear]")
const EqualButton = document.querySelector("[data-equal]")
/*--------------------------------------------------
電卓　関数
・データ要素それぞれに押すと動く要素を追加する
・追加された要素の中の関数がどんな動きをするか定義する
---------------------------------------------------*/
NumButton.forEach(button=>{
  button.addEventListener("click",()=>{
    const Numvalue = button.dataset.number;
    inputNumber(Numvalue);
  });
})
function inputNumber(Numvalue){
  if(lastInput==="equal"){
    current = "0";
    if(Numvalue!=="00"){
      current = Numvalue;
    };
  }else if(Numvalue!=="00"){
    if(current==="0"){
      current = Numvalue;
    }else{
      current += Numvalue;
    };
  }else if(current!=="0"){
    current += Numvalue;
  }
  lastInput = "number";
  ResultDisplay.text(progress+current);
}
OpeButton.forEach(button=>{
  button.addEventListener("click",()=>{
    const Opevalue = button.dataset.operator;
    inputOperator(Opevalue);
  });
})
function inputOperator(Opevalue){
  if(lastInput==="operator"){
    progress = progress.slice(0,-1);
    progress += Opevalue;
  }else if(lastInput==="number"){
    if(progress===""){
    progress = current+Opevalue;
  }else{
    progress = progress+current+Opevalue;
    };
  }else if(lastInput==="equal"){
    progress = current+Opevalue;
  };
  lastInput = "operator";
  current = "0"
  ResultDisplay.text(progress)
}
PointButton.addEventListener("click",()=>{
  inputPoint();
})
function inputPoint(){
  if(lastInput==="equal"){
    current = "0.";
  }else if(current.includes(".")){
    return;
  }else if(current==="0"){
    current = "0.";
  }else{
    current = current+".";
  };
  lastInput = "number";
  ResultDisplay.text(progress+current);
}
ClearButton.addEventListener("click",()=>{
  inputClear();
})
function inputClear(){
  current = "0";
  progress = "";
  lastInput = "";
  ResultDisplay.text("0");
}
EqualButton.addEventListener("click",()=>{
  inputEqual();
})
function inputEqual(){
  if(progress===""){
    return;
  }
  if(lastInput==="number"){
    progress += current;
  }else if(lastInput==="operator"){
    progress = progress.slice(0,-1);
  };
  current=eval(progress);
  progress = "";
  lastInput = "equal";
  ResultDisplay.text(current);
}