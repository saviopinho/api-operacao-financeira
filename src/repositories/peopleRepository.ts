import dataSource from '../data-source';
import { People } from '../entities/People';

export const peopleRepo = dataSource.getRepository(People);
