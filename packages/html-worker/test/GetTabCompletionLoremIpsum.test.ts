import { beforeEach, expect, jest, test } from '@jest/globals'

beforeEach(() => {
  jest.resetAllMocks()
})

jest.unstable_mockModule(
  '../src/parts/GenerateLoremIpsum/GenerateLoremIpsum.js',
  () => {
    return {
      paragraph: jest.fn(() => {
        throw new Error('not implemented')
      }),
    }
  },
)

const GetTabCompletionLoremIpsum = await import(
  '../src/parts/GetTabCompletionLoremIpsum/GetTabCompletionLoremIpsum.js'
)
const GenerateLoremIpsum = await import(
  '../src/parts/GenerateLoremIpsum/GenerateLoremIpsum.js'
)

test('getTabCompletionLoremIpsum', () => {
  // @ts-ignore
  GenerateLoremIpsum.paragraph.mockImplementation(() => {
    return 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Perspiciatis quisquam distinctio maiores repellat harum aliquid tempore nam culpa sint voluptas.'
  })
  expect(GetTabCompletionLoremIpsum.getTabCompletion('lorem')).toEqual({
    deleted: 5,
    inserted:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Perspiciatis quisquam distinctio maiores repellat harum aliquid tempore nam culpa sint voluptas.',
  })
})
