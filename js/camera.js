// ########################################
// # ELEMENTOS DO HTML
// ########################################
// const video = document.getElementById('video');
const videoElement = document.getElementById("video-camera");

// const canvas = document.getElementById('canvas');
const canvas = document.getElementById("canvas-camera");
const inputComprovante = document.getElementById("input-comprovante");

// const btnCapturar = document.getElementById('btnCapturar');
// const btnToggleCamera = document.getElementById('btnToggleCamera');
const btnAbrirCamera = document.getElementById("btn-abrir-camera");
const btnVoltarCamera = document.getElementById("btn-voltar-camera");
const btnCapturarFoto = document.getElementById("btn-capturar-foto");

const resultadoDiv = document.getElementById('resultado');

const modalCameraEl = document.getElementById("modalCamera");
const modalCamera = modalCameraEl ? new mdb.Modal(modalCameraEl) : null;

let cameraStream = null;

const pararCamera = () => {
    if (streamCamera) {
        streamCamera.getTracks().forEach(track => track.stop());
        streamCamera = null;
    }
    if (modalCamera) modalCamera.hide()
    resultadoDiv.innerText = "Pronto para escanear produto."
};
// document.addEventListener("DOMContentLoaded", () => {})
//    btnVincular.addEventListener("click", async () => {})
//  formCadastro.addEventListener("submit", async (event) => {

// Fechar o modal de exibição da camera e para a conexão com a camera
if (btnVoltarCamera)
    btnVoltarCamera.addEventListener("click", async () => {
        console.log("botão voltar clicado!")
        pararCamera()
    })

// Garante que a câmera desliga se o usuário fechar o modal no 'X' ou clicando fora
if (modalCameraEl)
    modalCameraEl.addEventListener('hidden.bs.modal', () => {
        pararCamera();
    });

// Abrir Câmera e exibir o Modal
if (btnAbrirCamera && modalCamera)
    btnAbrirCamera.addEventListener("click", async () => {
        console.log("botão abrir camera clicado!")
        try {
            streamCamera = await navigator.mediaDevices.getUserMedia({ video: { facingMode: "environment" } });
            videoElement.srcObject = streamCamera;
            modalCamera.show();
        } catch (err) {
            console.error("Erro ao acessar a câmera:", err);
            alert("Não foi possível acessar a câmera do dispositivo.");
        }
    });

async function postImage(dataIn) {
    fetch(`${CONSTANTS.API_URL}/upload`, {
        method: 'POST',
        body: dataIn
    })
        .then(res => res.json())
        .then(data => {
            resultadoDiv.innerText = "✅ Produto capturado com sucesso!";

            if (typeof carregarProdutos === "function") {
                carregarProdutos();
            }
        })
        .catch(err => {
            resultadoDiv.innerText = "Erro ao processar: " + err;
        });
}

if (videoElement && canvas && btnCapturarFoto && modalCamera && resultadoDiv)
    btnCapturarFoto.addEventListener("click", async () => {
        resultadoDiv.innerText = "Processando imagem com a IA... ⏳";

        canvas.width = videoElement.videoWidth;
        canvas.height = videoElement.videoHeight;
        const context = canvas.getContext('2d');
        context.drawImage(videoElement, 0, 0, canvas.width, canvas.height);

        canvas.toBlob(blob => {
            const formData = new FormData();
            formData.append('imagem', blob, 'captura.jpg');

            postImage(formData)

        }, 'image/jpeg', 0.85);
        pararCamera()
    })