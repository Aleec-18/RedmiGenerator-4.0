// =============================================
//  ReadmeGen — Lógica principal
//  Autor: Manuel Alejandro Mera Ruiz
//  Código: 2460971
//  Materia: Taller Habilidades Informáticas
// =============================================

// Lista de tecnologías agregadas
let techs = [];

// Permitir agregar tecnología con Enter
document.getElementById('tech-input').addEventListener('keydown', function (e) {
  if (e.key === 'Enter') {
    e.preventDefault();
    addTech();
  }
});

// =============================================
//  Agregar tecnología a la lista
// =============================================
function addTech() {
  const input = document.getElementById('tech-input');
  const valor = input.value.trim();

  if (!valor) return;
  if (techs.includes(valor)) {
    showToast('Esa tecnología ya la agregaste!');
    input.value = '';
    return;
  }

  techs.push(valor);
  input.value = '';
  renderTags();
}

// =============================================
//  Eliminar tecnología de la lista
// =============================================
function removeTech(nombre) {
  techs = techs.filter(t => t !== nombre);
  renderTags();
}

// =============================================
//  Mostrar tags en pantalla
// =============================================
function renderTags() {
  const container = document.getElementById('tags');
  container.innerHTML = techs.map(t =>
    `<span class="tag">
      ${t}
      <span class="tag-x" onclick="removeTech('${t}')">&times;</span>
    </span>`
  ).join('');
}

// =============================================
//  ALGORITMO PRINCIPAL: generateReadme()
//  Toma los datos del formulario y arma
//  el contenido del README en Markdown
// =============================================
function generateReadme() {
  const nombre      = document.getElementById('nombre').value.trim();
  const descripcion = document.getElementById('descripcion').value.trim();
  const instalacion = document.getElementById('instalacion').value.trim();
  const ejecucion   = document.getElementById('ejecucion').value.trim();
  const autor       = document.getElementById('autor').value.trim();

  // Validar campos obligatorios
  if (!nombre || !descripcion) {
    showToast('⚠️ El nombre y la descripción son obligatorios!');
    return;
  }

  let readme = '';

  // Título del proyecto
  readme += `# ${nombre}\n\n`;

  // Badges de tecnologías (shields.io)
  if (techs.length > 0) {
    const badges = techs.map(t => {
      const slug = t.trim().replace(/ /g, '_');
      return `![${t}](https://img.shields.io/badge/${slug}-informational?style=flat)`;
    }).join(' ');
    readme += `${badges}\n\n`;
  }

  // Sección: Descripción
  readme += `## Descripción\n\n${descripcion}\n\n`;

  // Sección: Tecnologías
  if (techs.length > 0) {
    readme += `## Tecnologías utilizadas\n\n`;
    techs.forEach(t => {
      readme += `- ${t}\n`;
    });
    readme += '\n';
  }

  // Sección: Instalación
  if (instalacion) {
    readme += `## Instalación\n\n\`\`\`bash\n${instalacion}\n\`\`\`\n\n`;
  }

  // Sección: Cómo ejecutar
  if (ejecucion) {
    readme += `## Cómo ejecutar\n\n\`\`\`bash\n${ejecucion}\n\`\`\`\n\n`;
  }

  // Sección: Autor
  if (autor) {
    readme += `## Autor\n\n${autor}\n\n`;
  }

  // Pie de página
  readme += `---\n_README generado con [ReadmeGen](https://readmegen.app)_ 🚀`;

  // Mostrar resultado en la preview
  mostrarPreview(readme);
}

// =============================================
//  Mostrar el README generado en pantalla
// =============================================
function mostrarPreview(texto) {
  document.getElementById('placeholder').style.display = 'none';

  const preview = document.getElementById('preview');
  preview.style.display = 'block';
  preview.textContent = texto;

  document.getElementById('preview-footer').style.display = 'flex';

  // Guardar para copiar/descargar
  window._readme = texto;
}

// =============================================
//  Copiar README al portapapeles
// =============================================
function copyReadme() {
  if (!window._readme) return;

  navigator.clipboard.writeText(window._readme).then(() => {
    const btn = document.getElementById('copy-btn');
    btn.classList.add('success');
    btn.textContent = '✅ Copiado!';
    showToast('Copiado al portapapeles!');

    setTimeout(() => {
      btn.classList.remove('success');
      btn.textContent = '📋 Copiar texto';
    }, 2000);
  });
}

// =============================================
//  Descargar README como archivo .md
// =============================================
function downloadReadme() {
  if (!window._readme) return;

  const blob = new Blob([window._readme], { type: 'text/markdown' });
  const url  = URL.createObjectURL(blob);
  const a    = document.createElement('a');

  a.href     = url;
  a.download = 'README.md';
  a.click();

  URL.revokeObjectURL(url);
  showToast('Descargando README.md...');
}

// =============================================
//  Mostrar notificación temporal (toast)
// =============================================
function showToast(mensaje) {
  const toast = document.getElementById('toast');
  toast.textContent = mensaje;
  toast.classList.add('show');

  setTimeout(() => {
    toast.classList.remove('show');
  }, 2500);
}
