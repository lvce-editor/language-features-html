const snippets = {
  input: '<input type="$0">$1',
  hr: '<hr>$0',
  br: '<br>$0',
  meta: '<meta>$0',
  div: '<div>\n\t$0\n</div>',
  h1: '<h1>$0</h1>',
  form: '<form action="">\n\n$0\n</form>',
  img: '<img src="" alt="">',
  a: '<a href="">$0</a>',
  script: '<script type="module" src="$0"></script>',
}

export const getTabCompletion = (wordAtOffset) => {
  if (snippets.hasOwnProperty(wordAtOffset)) {
    return {
      inserted: snippets[wordAtOffset],
      deleted: wordAtOffset.length,
      type: /* Snippet */ 2,
    }
  }
  return {
    inserted: `<${wordAtOffset}>$0</${wordAtOffset}>`,
    deleted: wordAtOffset.length,
    type: /* Snippet */ 2,
  }
}
