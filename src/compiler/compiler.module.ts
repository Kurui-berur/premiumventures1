import { Module } from '@nestjs/common';
import { SceneCompilerService } from './scene-compiler/scene-compiler.service';
import { SceneBulderService } from './scene-bulder/scene-bulder.service';
import { TransitionsCompilerService } from './transitions-compiler/transitions-compiler.service';
import { GraphValidatorService } from './graph-validator/graph-validator.service';

@Module({
  providers: [SceneCompilerService, SceneBulderService, TransitionsCompilerService, GraphValidatorService]
})
export class CompilerModule {}
