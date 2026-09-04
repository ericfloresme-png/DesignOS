import { describe, expect, it } from 'vitest';
import {
  TestStatusSchema,
  createTestDefinition,
  recordTestResult,
} from '../../src/core/test/test';

const definitionInput = {
  id: 'DOS-TEST-010',
  title: 'Test engine',
  type: 'UNIT',
  requirementIds: ['DOS-R011'],
  taskIds: ['DOS-TASK-009'],
  objective: 'Validar estados, historial, affected, regression y coverage.',
  preconditions: ['Run registrado'],
  input: 'Tests con resultados variados',
  steps: ['Registrar estados y resultados'],
  expectedResult: 'Estados permitidos e historial completo',
  passCriteria: 'Cálculo y estados correctos',
  failCriteria: 'Transición o resultado ambiguo',
  evidenceRequired: ['Resultados y cálculo'],
  priority: 'P0',
  affectedTestIds: ['DOS-TEST-009'],
  regressionTestIds: ['DOS-TEST-002'],
  applicableRequirementIds: ['DOS-R011'],
};

describe('DOS-TEST-010 — Test engine', () => {
  it('creates a definition with the approved initial state and traceability', () => {
    const test = createTestDefinition(definitionInput);

    expect(test.status).toBe('NOT_RUN');
    expect(test.requirementIds).toEqual(['DOS-R011']);
    expect(test.taskIds).toEqual(['DOS-TASK-009']);
    expect(test.affectedTestIds).toEqual(['DOS-TEST-009']);
    expect(test.regressionTestIds).toEqual(['DOS-TEST-002']);
    expect(test.coverage).toEqual({
      applicableRequirementIds: ['DOS-R011'],
      coveredRequirementIds: [],
    });
    expect(test.history).toEqual([]);
  });

  it('records PASS, FAIL and SKIPPED results without losing history', () => {
    const initial = createTestDefinition(definitionInput);
    const passed = recordTestResult(initial, { status: 'PASS', actual: 'Correcto', runId: 'DOS-RUN-001' });
    const failed = recordTestResult(passed, { status: 'FAIL', actual: 'Error', error: 'Resultado inesperado' });
    const skipped = recordTestResult(failed, { status: 'SKIPPED', actual: 'Omitido', evidenceIds: ['DOS-EVIDENCE-001'] });

    expect(skipped.status).toBe('SKIPPED');
    expect(skipped.history.map((entry) => entry.status)).toEqual(['PASS', 'FAIL', 'SKIPPED']);
    expect(skipped.history[1]?.error).toBe('Resultado inesperado');
    expect(skipped.evidenceIds).toEqual(['DOS-EVIDENCE-001']);
  });

  it('allows RUNNING and rejects statuses outside the approved set', () => {
    const test = createTestDefinition(definitionInput);
    expect(recordTestResult(test, { status: 'RUNNING' }).status).toBe('RUNNING');
    expect(() => TestStatusSchema.parse('INVALID')).toThrow();
  });
});
