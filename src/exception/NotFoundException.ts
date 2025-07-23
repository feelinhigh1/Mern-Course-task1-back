export class NotFoundException extends Error {
  statusCode?: number;

  constructor(message?: string, statusCode?: number) {
    super(message || 'Not Found');
    this.statusCode = statusCode || 404;
    this.name = 'NotFoundException';
    Object.setPrototypeOf(this, NotFoundException.prototype);
  }
}