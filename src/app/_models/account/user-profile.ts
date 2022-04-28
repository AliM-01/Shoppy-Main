export class UserProfileModel {
  constructor(fullName: string, avatarBase64: string) {
    this.fullName = fullName;
    this.avatarBase64 = avatarBase64;
  }
  fullName: string;
  avatarBase64: string;
}
