import dataSource from '../data-source';
import { Card } from '../entities/Card';

export const cardRepo = dataSource.getRepository(Card);
