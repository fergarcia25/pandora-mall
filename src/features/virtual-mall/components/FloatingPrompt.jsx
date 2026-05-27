const styles = {
  overlay: {
    position: 'fixed',
    inset: 0,
    zIndex: 50,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    pointerEvents: 'auto',
  },
  container: {
    background: 'linear-gradient(135deg, rgba(108,92,231,0.85) 0%, rgba(72,52,212,0.85) 100%)',
    color: '#ffffff',
    fontSize: '18px',
    padding: '20px 16px',
    borderRadius: '12px',
    border: '1px solid rgba(255,255,255,0.2)',
    boxShadow: '0 8px 32px rgba(108,92,231,0.4)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '12px',
    maxWidth: '300px',
    textAlign: 'center',
    pointerEvents: 'auto',
    userSelect: 'none',
    fontFamily: "'Inter', 'Segoe UI', sans-serif",
  },
  btn: {
    background: '#000000',
    color: '#ffffff',
    fontSize: '18px',
    padding: '8px 32px',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontWeight: 600,
  },
};

function FloatingPrompt({ prompt, onConfirm }) {
  if (!prompt) return null;

  return (
    <div style={styles.overlay}>
      <div style={styles.container}>
        {prompt.type === 'store' && (
          <div>¿Quieres entrar a la tienda <strong>{prompt.store.name}</strong>?</div>
        )}
        {prompt.type === 'npc' && (
          <div>¿Quieras saludar a Rick?</div>
        )}
        <button style={styles.btn} onClick={onConfirm}>
          OK
        </button>
      </div>
    </div>
  );
}

export default FloatingPrompt;
