// src/keyword-reply/keyword-reply.service.ts

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Keyword } from './entities/keyword.entity';
import { SetKeywordDto } from './dto/setKeyword.dto';

@Injectable()
export class KeywordService {
    constructor (
        @InjectRepository(Keyword)
        private keywordRepository: Repository<Keyword>,
    ) { }

    async setKeyword (setKeywordDto: SetKeywordDto) {
        const keywordReply = this.keywordRepository.create(setKeywordDto);
        return await this.keywordRepository.save(keywordReply);
    }

    async updateKeyword (id: string, setKeywordDto: SetKeywordDto) {
        const keywordReply = await this.keywordRepository.findOneBy({ id: id });
        if (!keywordReply) {
            throw new NotFoundException(`Keyword with ID ${ id } not found`);
        }

        const updatedKeywordReply = this.keywordRepository.merge(keywordReply, setKeywordDto);
        return this.keywordRepository.save(updatedKeywordReply);
    }

    async findAll (): Promise<Keyword[]> {
        return this.keywordRepository.find({});
    }

    async getReply (keyword: string) {
        return ((await this.keywordRepository.findOneBy({ keyword: keyword })).reply);
    }
}
