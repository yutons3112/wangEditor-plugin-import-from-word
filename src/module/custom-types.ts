/**
 * @description word element
 * @author yutons
 */

type EmptyText = {
  text: ''
}

export type ImportFromWord = {
  type: 'word'
  fileName: string
  link: string
  children: EmptyText[]
}
