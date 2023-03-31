class Modal extends HTMLElement {
	constructor() {
		super()
		this.attachShadow({ mode: "open" })
		this.shadowRoot.innerHTML = `
      <link rel="stylesheet" href="main.css" />
      <button>Click me</button>
      <p id="output"></p>
      <div class="modal">
        <div class="modal-content">
          <div class="modal-body">
            <div class="modal-body-content">
              <p></p>
            </div>
            <div class="buttons">
              <button class="confirmBtn" id="confirmBtn" value="Yes">Yes</button>
              <button id="cancel" value="Cancel">Cancel</button>
            </div>
          </div>
        </div>
      </div>
      `
		this.output = this.shadowRoot.querySelector("#output")
		this.button = this.shadowRoot.querySelector("button")
		this.confirm = this.shadowRoot.querySelector("#confirmBtn")
		this.cancel = this.shadowRoot.querySelector("#cancel")
	}

	attributeChangedCallback(name, oldValue, newValue) {
		this.shadowRoot.querySelector(".modal-body-content p").innerText =
			this.getAttribute("message")
	}

	static get observedAttributes() {
		return ["message"]
	}

	connectedCallback() {
		this._modal = this.shadowRoot.querySelector(".modal")
		this.button.addEventListener("click", this._showModal.bind(this))
		this.confirm.addEventListener("click", this._onConfirm.bind(this))
		this.cancel.addEventListener("click", this._onCancel.bind(this))
	}

	disconnectedCallback() {
		this.button.removeEventListener("click", this._showModal)
		this.confirm.removeEventListener("click", this._onConfirm)
		this.cancel.removeEventListener("click", this._onCancel)
	}

	_showModal() {
		this._modal.style.display = "block"
	}

	_onConfirm() {
		this._modal.style.display = "none"
		this.output.innerHTML = `You just clicked: "${this.confirm.value}".`
	}
	_onCancel() {
		this._modal.style.display = "none"
		this.output.innerHTML = `You just clicked: "${this.cancel.value}".`
	}
}
customElements.define("pp-modal", Modal)
