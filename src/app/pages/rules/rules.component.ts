import { Component, OnInit } from '@angular/core';
import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators} from '@angular/forms';
import { actions, profile, rule, successMessage } from '../../services/interface.share';
import { RulesService } from '../../services/rules.service';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-rules',
  standalone: true,
  imports: [ReactiveFormsModule, NgFor, NgIf, AsyncPipe],
  templateUrl: './rules.component.html',
  styleUrl: './rules.component.css'
})

export class RulesComponent implements OnInit {

  ruleForm = this.formBuilder.group({
    RuleId: '',
    RuleName: ['', Validators.required],
    Value: ['', Validators.required],
    Condition: ['', Validators.required],
  });

  actions =  actions;
  profilesList: profile[] = [];
  rules: rule[] = [];
  displayAddRule: string = actions.INITIAL;

  constructor(
    private formBuilder: FormBuilder,
    private rulesService: RulesService,
    public loginService : LoginService,
  ) {}

  ngOnInit() {
    this.rulesService.getRules().subscribe(data => this.rules = data);
  }

  showAddRule() {
    this.displayAddRule = actions.ADD;
    this.ruleForm.reset();
  }

  updateRule(rule: rule) {
    this.displayAddRule = actions.UPDATE;
    this.ruleForm.patchValue(rule);
  }

  deleteRule(id: any) {
    this.rulesService.deleteRuleDetails(id).subscribe(data => {
      if(data?.message.toLowerCase() === successMessage.RULE_DELETED){
        this.loginService.message.next(data?.message);
        let newUsersList = this.rules.filter(user => user?.RuleId !== id);
        this.rules = newUsersList;
        this.loginService.resetMessage();
        }
    });
  }

  onSubmit(ruleForm: any, action: actions) {
    if(action === actions.UPDATE) {
      this.rulesService.updateRuleDetails(ruleForm.RuleId, {
        RuleName: ruleForm?.RuleName,
        Value: ruleForm?.Value,
        Condition: ruleForm?.Condition
      }).subscribe(data => {
        if(data?.message.toLowerCase() === successMessage.RULE_UPDATED) {
          this.loginService.message.next(data?.message);
          let index = this.rules.findIndex(x => x.RuleId == ruleForm.RuleId); 
          this.rules[index].RuleName = ruleForm?.RuleName;
          this.rules[index].Condition = ruleForm?.Condition;
          this.rules[index].Value = ruleForm?.Value;
          this.loginService.resetMessage();
        }
       });
    } else {
      this.rulesService.addRuleDetails(ruleForm).subscribe(data => {
        if(data?.message.toLowerCase() === successMessage.RULE_ADDED) {
          this.loginService.message.next(data?.message);
          this.rules.push({
            RuleName: ruleForm?.RuleName,
            Value: ruleForm?.Value,
            Condition: ruleForm?.Condition
          });
          this.loginService.resetMessage();
        }
      });
    }
    this.displayAddRule = actions.INITIAL;
  }

}