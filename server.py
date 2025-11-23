import http.server
import socketserver
import os
from urllib.parse import parse_qs

PORT = 8080
DIRECTORY = os.path.dirname(os.path.abspath(__file__))

class Handler(http.server.SimpleHTTPRequestHandler):
    def do_POST(self):
        if self.path == '/contato':
            content_length = int(self.headers['Content-Length'])
            post_data = self.rfile.read(content_length)
            data = parse_qs(post_data.decode('utf-8'))
            nome = data.get('nome', [''])[0]
            email = data.get('email', [''])[0]
            whatsapp = data.get('whatsapp', [''])[0]
            mensagem = data.get('mensagem', [''])[0]
            # Aqui você pode salvar, logar ou processar os dados como quiser
            print(f"Novo contato: {nome} | {email} | {whatsapp} | {mensagem}")
            self.send_response(200)
            self.send_header('Content-type', 'text/plain; charset=utf-8')
            self.end_headers()
            self.wfile.write(b'Recebido!')
        else:
            self.send_error(404, "Not found")

    def do_GET(self):
        if self.path == '/':
            self.path = '/landing.html'
        return http.server.SimpleHTTPRequestHandler.do_GET(self)

    def translate_path(self, path):
        # Serve arquivos do diretório atual
        rel_path = path.lstrip('/')
        full_path = os.path.join(DIRECTORY, rel_path)
        if os.path.isdir(full_path):
            for index in ("index.html", "landing.html"):
                index_path = os.path.join(full_path, index)
                if os.path.exists(index_path):
                    return index_path
        return full_path

if __name__ == "__main__":
    os.chdir(DIRECTORY)
    with socketserver.TCPServer(("", PORT), Handler) as httpd:
        print(f"Servidor rodando em http://localhost:{PORT}")
        httpd.serve_forever()
