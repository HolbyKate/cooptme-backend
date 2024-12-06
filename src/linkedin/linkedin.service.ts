import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Profile } from '../profiles/profile.entity';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';

@Injectable()
export class LinkedinService {
  constructor(
    @InjectRepository(Profile)
    private profileRepository: Repository<Profile>,
    private configService: ConfigService,
  ) {}

  async getProfileFromLinkedIn(profileUrl: string) {
    try {
      const linkedinApiKey = this.configService.get('LINKEDIN_API_KEY');
      const profileId = this.extractProfileId(profileUrl);

      const response = await axios.get(
        `https://api.linkedin.com/v2/people/${profileId}`,
        {
          headers: {
            Authorization: `Bearer ${linkedinApiKey}`,
            'X-Restli-Protocol-Version': '2.0.0',
          },
        },
      );

      const profileData = this.transformLinkedInData(response.data);
      return this.saveProfile(profileData);
    } catch (error) {
      throw new HttpException(
        'Erreur lors de la récupération du profil LinkedIn',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  private extractProfileId(profileUrl: string): string {
    // Extrait l'ID du profil de l'URL LinkedIn
    const matches = profileUrl.match(/linkedin.com\/in\/([^\/]+)/);
    return matches ? matches[1] : '';
  }

  private transformLinkedInData(data: any) {
    return {
      linkedInId: data.id,
      firstName:
        data.firstName.localized.fr_FR || data.firstName.localized.en_US,
      lastName: data.lastName.localized.fr_FR || data.lastName.localized.en_US,
      location: data.location?.name || '',
      currentPosition: this.extractCurrentPosition(data),
      skills: this.extractSkills(data),
    };
  }

  private extractCurrentPosition(data: any) {
    const position = data.positions?.values?.[0] || {};
    return {
      title: position.title || '',
      company: position.company?.name || '',
    };
  }

  private extractSkills(data: any) {
    return data.skills?.values?.map((skill) => skill.name) || [];
  }

  private async saveProfile(profileData: any) {
    const profile = this.profileRepository.create(profileData);
    return this.profileRepository.save(profile);
  }
}
