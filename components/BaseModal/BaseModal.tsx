export default function BaseModal({ message }: any) {
  return (
    <>
      <div className="modal-backdrop">
        <div className="modal">
          <header className="modal-header">Error</header>
          <header className="modal-header">Success</header>
          <header className="modal-header">Verification</header>
          <section className="modal-body">
            Sorry. Something went wrong
            <span className="error">Error: {message}</span>
          </section>
          <section className="modal-body">You may now log in.</section>
          <section className="modal-body">
            Enter verification code: <input v-model="inputCode" />
          </section>
          <footer className="modal-footer">
            <button
              type="button"
              className="btn-input"
            >
              Confirm
            </button>
            <button
              type="button"
              className="btn-input"
            >
              Cancel
            </button>
          </footer>
        </div>
      </div>
    </>
  );
}
