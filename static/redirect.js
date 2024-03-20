if (window.location.href.includes("snail-ide.js.org")) {
    const currentPath = window.location.pathname;
    window.location.href = `https://editor.snail-ide.com${currentPath}`;
}
