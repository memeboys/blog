export const BlogApiExceptionCode = {
  UNAUTHORIZED: 'UNAUTHORIZED',
  INVALID_EMAIL_OR_PASSWORD: 'INVALID_EMAIL_OR_PASSWORD',
  NETWORK_ERROR: 'NETWORK_ERROR',
  UNKNOWN: 'UNKNOWN',
};

export class BlogApiException extends Error {
  constructor(code) {
    super(code);
    this.code = code;
    this.name = 'BlogApiException';
  }
}
