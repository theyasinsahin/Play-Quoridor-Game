import actionCalculate from "./Bot/bot";
import AI from "./AI/ai";

onmessage = async function(event) {
    console.log("workera girdim");
    let action;
    let nickNameIdx;
    
    if(event.data.initialPlayer === "player1"){
        nickNameIdx = 0;
    }else{
        nickNameIdx = 1;
    }
    
    
    if(event.data.nickNames[nickNameIdx] === 'Bot'){
        action = actionCalculate(event.data);
        console.log("Bot made this action: ", action);
    }else if(event.data.nickNames[nickNameIdx] === 'AI'){
        try {
            const ai = new AI(1000, 1.5, true);
            action = ai.chooseNextMove(event.data);
        } catch (error) {
            console.error("Error in AI calculation:", error);
        }
        console.log("AI made this action: ", action);
    }
    postMessage(action);
}