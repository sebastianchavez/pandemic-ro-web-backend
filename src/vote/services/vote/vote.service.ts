import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { IRequestVote } from '../../../common/interfaces/request-vote.interface';
import { CpanelService } from '../../../common/services/cpanel/cpanel.service';
import { VoteDto } from '../../../vote/dtos/vote.dto';
import { LessThan, MoreThan, Not, Repository, In } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Vote } from 'src/vote/entities/vote.entity';
import { Alternative } from 'src/vote/entities/alternative.entity';
import { Question } from 'src/vote/entities/question.entity';
import { RequestSaveQuestionDto } from 'src/vote/dtos/request-save-question.dto';
import { RequestUpdateQuestionDto } from 'src/vote/dtos/request-update-question.dto';
import { RequestSaveAlternativeDto } from 'src/vote/dtos/request-save-alternative.dto';
import { RequestUpdateAlternativeDto } from 'src/vote/dtos/request-update-alternative.dto';
import { RequestSaveVoteDto } from 'src/vote/dtos/request-save-vote.dto';
import { User } from 'src/users/entities/User.entity';
import { RequestSendVoteQuestionDto } from 'src/vote/dtos/request-send-vote-question.dto';

@Injectable()
export class VoteService {

    constructor(
        private cpanelService: CpanelService,
        @InjectRepository(Vote)
        private voteRepository: Repository<Vote>,
        @InjectRepository(Alternative)
        private alternativeRepository: Repository<Alternative>,
        @InjectRepository(Question)
        private questionRepository: Repository<Question>,
        @InjectRepository(User)
        private userRepository: Repository<User>
    ) { }

    vote(request: VoteDto) {
        const { email, ip, rank } = request
        const requestVote: IRequestVote = {
            email,
            ip,
            rank
        }
        return this.cpanelService.vote(requestVote)
    }

    async saveQuestion(request: RequestSaveQuestionDto) {
        try {
            const { alternatives, endDate, question: quest, idServer, startDate } = request
            const newQuestion = new Question()
            newQuestion.endDate = endDate;
            newQuestion.startDate = startDate;
            newQuestion.question = quest;
            newQuestion.idServer = idServer;

            const question = await this.questionRepository.insert(newQuestion)

            for await (let a of alternatives) {
                const newAlternative = new Alternative()
                newAlternative.alternative = a.alternative
                newAlternative.value = a.value
                newAlternative.idQuestion = question.raw.insertId
                await this.alternativeRepository.insert(newAlternative)
            }
            return {
                message: 'Ok'
            }
        } catch (error) {
            throw error

        }
    }

    async updateQuestion(request: RequestUpdateQuestionDto) {
        try {
            const { question, idServer, startDate, endDate, idQuestion } = request
            const responseQuestion = await this.questionRepository.findOneBy({ idQuestion })
            if (responseQuestion) {
                responseQuestion.question = question
                responseQuestion.idServer = idServer
                responseQuestion.startDate = startDate
                responseQuestion.endDate = endDate
            }
        } catch (error) {
            throw error
        }
    }

    async deleteQuestion(idQuestion: number) {
        try {
            await this.alternativeRepository.delete({ idQuestion })
            return this.questionRepository.delete({ idQuestion })
        } catch (error) {
            throw error
        }
    }

    getQuestions() {
        try {
            return this.questionRepository.find({ relations: ['idServer'] })
        } catch (error) {
            throw error
        }
    }

    getQuestionsAvailables() {
        try {
            return this.questionRepository.findBy({})
        } catch (error) {
            throw error
        }
    }

    saveAlternative(request: RequestSaveAlternativeDto) {
        try {
            return this.alternativeRepository.insert(request)
        } catch (error) {
            throw error
        }
    }

    async updateAlternative(request: RequestUpdateAlternativeDto) {
        try {
            const { alternative, value } = request
            const responseAlternative = await this.alternativeRepository.findOneBy({})
            if (responseAlternative) {
                responseAlternative.value = value
                responseAlternative.alternative = alternative
            }
        } catch (error) {
            throw error
        }
    }

    deleteAlternative(idAlternative: number) {
        try {
            return this.alternativeRepository.delete({ idAlternative })
        } catch (error) {
            throw error
        }
    }

    getAlternatives() {
        try {
            return this.alternativeRepository.findBy({})
        } catch (error) {
            throw error
        }
    }

    getAlternativesByQuestion() {
        try {
            return this.alternativeRepository.findBy({})
        } catch (error) {
            throw error
        }
    }

    saveVote(request: RequestSaveVoteDto) {
        try {
            return this.voteRepository.insert(request)
        } catch (error) {
            throw error
        }
    }

    getVotes() {
        try {
            return this.voteRepository.find({})
        } catch (error) {
            throw error
        }
    }

    async getVote(req: any) {
        try {
            const {
                user: { email, idUser },
            } = req;
            const user = await this.userRepository.findOneBy({ idUser })

            if (!user.isVerified) {
                throw new HttpException('Usuario no verificado', HttpStatus.BAD_REQUEST)
            }

            const now = new Date()

            const votes = await this.voteRepository.find({where:{idUser}, relations: {idQuestion: true}})

            const idsQuestions = votes.map(x => x.idQuestion.idQuestion)

            const question = await this.questionRepository.findOne({ 
                order: { startDate: 'ASC' }, where: {
                    startDate: LessThan(now),
                    endDate: MoreThan(now),
                    idQuestion: Not(In(idsQuestions))
                },
            })
            
            if(question){
                const alternatives = await this.alternativeRepository.findBy({
                    idQuestion: question.idQuestion
                })
                return {
                    question,
                    alternatives
                }
            } else {
                return null
            }
            
        } catch (error) {
            throw error
        }
    }

    async sendVote(req: any, body: RequestSendVoteQuestionDto){
        try {
            const {
                user: { email, idUser },
            } = req;
            const user = await this.userRepository.findOneBy({ idUser })

            const { idQuestion, ip, response } = body
            const newVote = new Vote()
            newVote.idQuestion = idQuestion;
            newVote.idUser = idUser;
            newVote.ip = ip
            newVote.response = response
            return this.voteRepository.insert(newVote)
        } catch (error) {
            throw error
        }
    }
}
