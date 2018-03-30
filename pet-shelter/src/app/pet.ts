export class Pet {
  constructor(
    public id: number = Math.floor(Math.random() * 9999) + 1,
    public name: string = '',
    public type: string = '',
    public description: string = '',
    public skills: any = [
      {
        'skill': '',
      },
      {
        'skill': '',
      },
      {
        'skill': '',
      }
    ],
    public likes: number = 0
  ) {}
}
