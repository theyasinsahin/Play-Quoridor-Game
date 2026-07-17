import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './StartPage.css';

const StartPage = (props) => {

    const [player1Name, setPlayer1Name] = useState('');
    const [player2Name, setPlayer2Name] = useState('');
    const [gameMode, setGameMode] = useState('2Player');
    const [playerRole, setPlayerRole] = useState('player1');
    const [isThereComp, setIsThereComp] = useState(false);

    const navigate = useNavigate();


    const handleSubmit = (e) => {
        e.preventDefault();
        
        // Online mod dışındaki modlar için normal yönlendirme
        navigate('/game', { state: { player1Name, player2Name, mode: gameMode, playerRole, isThereComp } });
    };

    
    const handleModeClick = (selectedMode) => {
        if(selectedMode !== gameMode){
            if(selectedMode === "AI" || selectedMode === "Bot"){
                setIsThereComp(true);
            }else{
                setIsThereComp(false);
            }
            setGameMode(selectedMode);
            setPlayer2Name('');
            if (selectedMode === 'AI' || selectedMode === 'Bot' || selectedMode==="Online") {
                setPlayer2Name(selectedMode); // Set player2Name to 'AI' or 'Bot' when against AI or Bot mode is selected
            }
            if(selectedMode === "CwsC"){
                setPlayer1Name("AI");
                setPlayer2Name("Bot");
            }
        }
    };

    const handleCwsCMode = (playerRole) => {
        setPlayerRole(playerRole)
        if(playerRole === "player1"){
            setPlayer1Name("AI");
            setPlayer2Name("Bot");
        }else{
            setPlayer1Name("Bot");
            setPlayer2Name("AI");
        }
    }

    return (
        <div className="container">
        <h1 className='title'>Quoridor Game</h1>
        <div className="content">
            <form onSubmit={handleSubmit}>
                {(gameMode !== "CwsC") && (
                    <div>
                    <label>
                        <span>{gameMode!=="2Player" ? "Player Name" : "First Player"}</span>
                        <input type="text" value={player1Name} onChange={(e) => setPlayer1Name(e.target.value)} required />
                    </label>
                </div>
                )}
                
                {(gameMode !== 'AI' && gameMode !== 'Bot' && gameMode !== 'Online' && gameMode !== "CwsC") && (
                <div>
                    <label>
                        <span>Second Player</span>
                        <input type="text" value={player2Name} onChange={(e) => setPlayer2Name(e.target.value)} required />
                    </label>
                </div>
                )}
                <h2>Select Game Mode</h2>
                <div className="mode-row">
                <button
                    type="button"
                    onClick={() => handleModeClick('2Player')}
                    className={`mode-button ${gameMode === '2Player' ? 'active' : ''}`}
                >
                    2 Player
                </button>
                <button
                    type="button"
                    onClick={() => handleModeClick('AI')}
                    className={`mode-button ${gameMode === 'AI' ? 'active' : ''}`}
                >
                    Against AI
                </button>
                <button
                    type="button"
                    onClick={() => handleModeClick('Bot')}
                    className={`mode-button ${gameMode === 'Bot' ? 'active' : ''}`}
                >
                    Against Bot
                </button>
                <button
                    type="button"
                    onClick={() => handleModeClick('CwsC')}
                    className={`mode-button ${gameMode === 'CwsC' ? 'active' : ''}`}
                >
                    C ws C
                </button>
            </div>
            {/* Conditionally render player role selection if gameMode is 'AI' or 'Bot' */}
            {(gameMode === 'AI' || gameMode === 'Bot') && (
                <div>
                    <h2>Choose Your Role</h2>
                    <div className="mode-row">
                        <button
                            type="button"
                            onClick={() => setPlayerRole('player1')}
                            className={`mode-button ${playerRole === 'player1' ? 'active' : ''}`}
                        >
                            Play as First Player
                        </button>
                        {/*<button
                            type="button"
                            onClick={() => setPlayerRole('player2')}
                            className={`mode-button ${playerRole === 'player2' ? 'active' : ''}`}
                        >
                            Play as Second Player
                        </button>*/}
                    </div>
                </div>
            )}

            {(gameMode === 'CwsC') && (
                <div>
                    <h2>Choose Your Role</h2>
                    <div className="mode-row">
                        <button
                            type="button"
                            onClick={() => handleCwsCMode("player1")}
                            className={`mode-button ${playerRole === 'player1' ? 'active' : ''}`}
                        >
                            AI Play as First Player
                        </button>
                        <button
                            type="button"
                            onClick={() => handleCwsCMode("player2")}
                            className={`mode-button ${playerRole === 'player2' ? 'active' : ''}`}
                        >
                            AI Play as Second Player
                        </button>
                    </div>
                </div>
            )}  

            <button type="submit" disabled={!gameMode}>Start Game</button>
        </form>
        </div>
</div>

    );
};

export default StartPage;