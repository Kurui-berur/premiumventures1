import { RuntimeViewSnapshot }
from './runtime-view-snapshot.interface';

export interface RuntimeViewProvider {

  snapshot(): RuntimeViewSnapshot;

}