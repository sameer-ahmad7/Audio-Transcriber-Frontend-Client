export class Duration {
  constructor(public Milliseconds: number) {}
  get Seconds(): number {
    return this.Milliseconds / 1000;
  }
  get String(): string {
    const secs = Math.round(this.Seconds % 60);
    const totalMins = Math.floor(this.Seconds / 60);
    const mins = totalMins % 60;
    const hrs = Math.floor(totalMins / 60);

    if (hrs > 0) {
      return `${hrs}h ${mins}m ${secs}s`;
    } else {
      return `${mins}m ${secs}s`;
    }
  }
}
