function ToggleButton({ gameType, onClick }){
    return (
        <div className="toggle-container">
            <div 
                className={`toggle-option ${gameType === 1 ? 'active' : ''}`}
                onClick={() => gameType !== 1 && onClick()}
            >
                vs AI
            </div>
            <div 
                className={`toggle-option ${gameType === 0 ? 'active' : ''}`}
                onClick={() => gameType !== 0 && onClick()}
            >
                vs Human
            </div>
        </div>
    )
}

export default ToggleButton;