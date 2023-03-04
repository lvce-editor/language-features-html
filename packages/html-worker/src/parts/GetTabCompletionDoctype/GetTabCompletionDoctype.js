const SNIPPET_DOCTYPE = {
  inserted: `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>Document</title>
  </head>
  <body>

  </body>
</html>
`,
  deleted: 1,
  type: /* Snippet */ 2,
}

export const getTabCompletionDoctype = () => {
  return SNIPPET_DOCTYPE
}
