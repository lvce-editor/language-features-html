const ATTRIBUTE_NAME_COMPLETIONS = [
  {
    label: 'class',
    snippet: 'class="$1"',
    kind: /* Value */ 2,
  },
  {
    label: 'id',
    snippet: 'id="$1"',
    kind: /* Value */ 2,
  },
  {
    label: 'tabindex',
    snippet: 'tabindex="$1"',
    kind: /* Value */ 2,
  },
]

export const getAttributeNameCompletions = () => {
  return ATTRIBUTE_NAME_COMPLETIONS
}
