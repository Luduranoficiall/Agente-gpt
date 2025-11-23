from fastapi import APIRouter, Header, HTTPException
from fastapi.responses import HTMLResponse

from .auth_jwt import validar_token

router = APIRouter()

LOGIN_HTML = """
<!DOCTYPE html>
<html>
<head>
<meta charset=\"utf-8\">
<title>Login — Agente GPT</title>
<style>
body { background:#111827; color:white; font-family:Arial; display:flex; justify-content:center; align-items:center; height:100vh; }
form { background:white; color:black; padding:30px; border-radius:14px; }
input { display:block; padding:10px; margin:10px 0; width:100%; }
button { padding:12px; background:#111827; color:white; border:none; width:100%; font-size:16px; border-radius:8px; cursor:pointer; }
</style>
</head>
<body>

<form onsubmit=\"login(event)\">
<h2>Login da Empresa</h2>
<input id=\"token\" placeholder=\"Cole seu token aqui\" />
<button>Entrar</button>
</form>

<script>
function login(e){
    e.preventDefault();
    const t = document.getElementById('token').value;
    localStorage.setItem('token', t);
    window.location.href = '/panel?x-token=' + t;
}
</script>

</body>
</html>
"""


@router.get("/login", response_class=HTMLResponse)
def login_page():
    return LOGIN_HTML
