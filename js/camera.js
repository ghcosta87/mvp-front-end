// ARQUIVO: camera.js

const video = document.getElementById('video');
const canvas = document.getElementById('canvas');
const btnCapturar = document.getElementById('btnCapturar');
const btnToggleCamera = document.getElementById('btnToggleCamera');
const resultadoDiv = document.getElementById('resultado');

let cameraStream = null;

// Proteção: Só executa se estivermos na tela que tem a câmera
if (video && canvas && btnCapturar && btnToggleCamera && resultadoDiv) {

    // ARQUIVO: camera.js

    async function alternarCamera() {
        if (cameraStream) {
            // Se a câmera estiver ligada, desliga
            cameraStream.getTracks().forEach(track => track.stop());
            cameraStream = null;
            video.srcObject = null;
            video.style.display = 'none';

            btnToggleCamera.innerText = 'Ligar Câmera';
            btnToggleCamera.classList.remove('btn-danger');
            btnToggleCamera.classList.add('btn-primary');
        } else {
            try {
                if (!navigator.mediaDevices || !navigator.mediaDevices.enumerateDevices) {
                    throw new Error("Seu navegador não suporta a busca de dispositivos.");
                }

                // 1. Busca todos os dispositivos de mídia do sistema
                const dispositivos = await navigator.mediaDevices.enumerateDevices();
                // Filtra apenas as entradas de vídeo (câmeras)
                const cameras = dispositivos.filter(dispositivo => dispositivo.kind === 'videoinput');

                console.log("Câmeras encontradas no Linux:", cameras);

                if (cameras.length === 0) {
                    throw new Error("Nenhuma câmera detectada pelo navegador.");
                }

                // 2. Tenta conectar em cada câmera encontrada até uma funcionar
                let streamEncontrado = null;

                for (const cam of cameras) {
                    try {
                        streamEncontrado = await navigator.mediaDevices.getUserMedia({
                            video: { deviceId: { exact: cam.deviceId } },
                            audio: false
                        });
                        if (streamEncontrado) break; // Se funcionou, para o loop!
                    } catch (e) {
                        console.warn(`Dispositivo ${cam.label || cam.deviceId} falhou, tentando o próximo...`);
                    }
                }

                // Se o loop falhou em todas, tenta a solicitação genérica como último recurso
                if (!streamEncontrado) {
                    streamEncontrado = await navigator.mediaDevices.getUserMedia({ video: true });
                }

                // 3. Conecta o vídeo à tela
                cameraStream = streamEncontrado;
                video.srcObject = cameraStream;
                video.style.display = 'block';

                // 🚨 NOVO: Força o navegador a dar o play na imagem
                await video.play();
                
                btnToggleCamera.innerText = 'Desligar Câmera';
                btnToggleCamera.classList.remove('btn-primary');
                btnToggleCamera.classList.add('btn-danger');

            } catch (err) {
                console.error("Erro ao ligar a câmera:", err);
                alert("Erro ao acessar a câmera: " + err.message + "\nUsando modo de envio de arquivo!");
                if (fallbackUpload) fallbackUpload.click();
            }
        }
    }

    // async function alternarCamera() {
    //     if (cameraStream) {
    //         cameraStream.getTracks().forEach(track => track.stop());
    //         cameraStream = null;
    //         video.srcObject = null;
    //         video.style.display = 'none';

    //         btnToggleCamera.innerText = 'Ligar Câmera';
    //         btnToggleCamera.classList.remove('btn-danger');
    //         btnToggleCamera.classList.add('btn-primary');
    //     } else {
    //         try {
    //             cameraStream = await navigator.mediaDevices.getUserMedia({
    //                 video: { facingMode: { exact: "environment" } }
    //             }).catch(() => navigator.mediaDevices.getUserMedia({ video: true }));

    //             video.srcObject = cameraStream;
    //             video.style.display = 'block';

    //             btnToggleCamera.innerText = 'Desligar Câmera';
    //             btnToggleCamera.classList.remove('btn-primary');
    //             btnToggleCamera.classList.add('btn-danger');
    //         } catch (err) {
    //             resultadoDiv.innerText = "Erro ao acessar a câmera: " + err;
    //             // } catch (err) {
    //             // 🚨 Vai imprimir O NOME EXATO do erro no console
    //             console.error("ERRO DA CÂMERA:", err.name, err.message);

    //             alert("Erro na câmera: " + err.name + ". Usando modo de envio de arquivo!");
    //             fallbackUpload.click();
    //         }
    //     }
    // }

    btnToggleCamera.addEventListener('click', alternarCamera);

    btnCapturar.addEventListener('click', () => {
        if (!cameraStream) {
            alert("Por favor, ligue a câmera antes de tirar a foto!");
            return;
        }

        resultadoDiv.innerText = "Processando imagem com a IA... ⏳";

        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        const context = canvas.getContext('2d');
        context.drawImage(video, 0, 0, canvas.width, canvas.height);

        canvas.toBlob(blob => {
            const formData = new FormData();
            formData.append('imagem', blob, 'captura.jpg');

            // ⚠️ MUDANÇA: Usando a URL da nossa constante global!
            fetch(`${CONSTANTS.API_URL}/upload`, {
                method: 'POST',
                body: formData
            })
                .then(res => res.json())
                .then(data => {
                    resultadoDiv.innerText = "✅ Produto capturado com sucesso!";

                    // MÁGICA DA SPA: Manda atualizar a lista de produtos imediatamente!
                    if (typeof carregarProdutos === "function") {
                        carregarProdutos();
                    }
                })
                .catch(err => {
                    resultadoDiv.innerText = "Erro ao processar: " + err;
                });
        }, 'image/jpeg', 0.85);
    });
}