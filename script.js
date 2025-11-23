// JS para feedback do formulário e máscara simples de WhatsApp
const form = document.getElementById('contatoForm');
const msg = document.getElementById('formMsg');
const whatsappInput = document.getElementById('whatsapp');

if (form) {
    form.addEventListener('submit', async function(e) {
        e.preventDefault();
        msg.textContent = 'Enviando...';
        const data = new FormData(form);
        const res = await fetch('/contato', {
            method: 'POST',
            body: data
        });
        if (res.ok) {
            msg.textContent = 'Recebido! Em breve entraremos em contato.';
            form.reset();
        } else {
            msg.textContent = 'Erro ao enviar. Tente novamente.';
        }
    });
}

if (whatsappInput) {
    whatsappInput.addEventListener('input', function(e) {
        let v = e.target.value.replace(/\D/g, '');
        if (v.length > 11) v = v.slice(0, 11);
        if (v.length > 6) {
            e.target.value = `(${v.slice(0,2)}) ${v.slice(2,7)}-${v.slice(7)}`;
        } else if (v.length > 2) {
            e.target.value = `(${v.slice(0,2)}) ${v.slice(2)}`;
        } else {
            e.target.value = v;
        }
    });
}