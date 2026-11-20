# BUGTI Questionnaire Content and Scoring

## 1. Decision and status



* Content version: **BUGTI-Q3**. Scoring specification version: **BUGTI-S1**.

* BUGTI-S1 applies to BUGTI-Q3 with the unchanged ID-to-dimension and scoring-key map in this document. Changed scenarios constitute new content: previous wording is not measurement-equivalent, and responses to different content versions must not be pooled or compared as calibrated scores.

* **32 scored statements**, eight for each existing dimension, with four statements keyed toward each pole.

* **Five fully labeled agreement categories**, in the same disagreement-to-agreement order for every statement.

* **Equal item weights**, one scored dimension per item, no hidden questions, no bonus points, and no cross-dimension adjustments.

* Intended completion time: **7–10 minutes**. This is a design estimate; the timing acceptance test is in Section 9.

* English is the language of this specification. The explicitly labeled Simplified Chinese passages are localized questionnaire content, provided alongside the English content.

* This document specifies content and scoring. The exploratory page flow implements this convention; implementation and result-link details are maintained in [Questionnaire implementation](0004-questionnaire-implementation.md). Empirical validation remains incomplete.

**Scientific status: evidence-informed questionnaire design, not a validated psychological instrument.** Transparent arithmetic can be verified now. Reliability, construct validity, bipolarity, language equivalence, and completion time require real respondents. No scoring formula, number of categories, or plausible wording can guarantee these properties without empirical validation. The validation requirements below are part of the specification, not completed research.

The purpose remains self-reflection about technical preferences. Neither pole represents technical ability, professional maturity, or a correct engineering practice. Do not use scores for recruitment, performance appraisal, diagnosis, or career decisions. Existing definitions and approved type names remain authoritative in [PRODUCT.md](../PRODUCT.md), [dimensions.ts](../app/data/dimensions.ts), and [personalities.ts](../app/data/personalities.ts).

## 2. Response-format decision

### 2.1 Why five categories

**Choose five categories for this version.** The requested format is agreement with short statements. Five categories permit a distinction between moderate and strong responses while retaining a genuine midpoint. They also allow clear labels in both supported languages without asking respondents to repeatedly distinguish three subtly different degrees on each side.

Evidence does not establish one universally best number of categories:



* Revilla, Saris, and Krosnick's available working paper compares agreement formats and favors a fully labeled five-category format over seven- and eleven-category formats labeled only at their endpoints. Category count and labeling are confounded in that comparison; it does not prove that every fully labeled five-category questionnaire outperforms every fully labeled seven-category questionnaire. \[S3]

* Simms and colleagues' randomized personality-questionnaire study found lower measurement precision with two to five categories and no additional psychometric advantages beyond six. Criterion validity did not follow the same pattern. This supports taking the possible benefit of seven seriously, while also showing that greater precision and greater validity are different claims. Its undergraduate sample and existing personality measure do not establish an optimal format for BUGTI. \[S4]

* Scale-development guidance emphasizes matching the format to the construct, clear wording, representative coverage, response-process checks, and empirical validation. Changing the category count alone does not validate a new measure. \[S5, S6]

The five-category choice is a **provisional product decision supported by relevant, mixed evidence**. It balances interpretable labels and a short questionnaire. It must be checked against a fully labeled seven-category version with BUGTI respondents before claiming comparative superiority.

### 2.2 Comparison with the alternatives



| Categories | What responses can express                                                                        | Decision for BUGTI-Q3                                                                                                                                                                                                                               |
| ---------- | ------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 3          | Disagreement, neutrality, agreement; no separate moderate/strong response within either direction | Reject as the default because it intentionally removes the intensity distinction sought here. Research offers reasons to expect reduced precision with very few categories, but this is not proof that every three-category scale is invalid. \[S4] |
| 5          | Two disagreement levels, neutrality, two agreement levels                                         | Adopt. All labels are explicit; suitability for BUGTI remains to be tested.                                                                                                                                                                         |
| 7          | Three disagreement levels, neutrality, three agreement levels                                     | Retain as the empirical comparison condition. It may improve discrimination if respondents use the additional categories meaningfully. Do not reject it as inherently slow or scientifically inferior. \[S4]                                        |

16Personalities provides a useful reference for concise self-report statements. Its accessible first question exposes seven answer choices, and its test identifies 60 questions. Those observations describe that product; they do not provide BUGTI's constructs or scoring weights. \[S1]

SBTI's public introduction describes about 30 main questions, a hidden branch, and entertainment-only use. Its FAQ's H/M/L classification is a result-level description, not proof of the number of answer choices. The three-category answer example supplied in the request is treated as reference context, not independent scientific evidence. BUGTI adopts neither its hidden-trigger logic nor its personality-matching rules. \[S2]

All 32 BUGTI statements below are original. No reference questionnaire's item bank, proprietary scoring algorithm, accuracy claim, or diagnostic interpretation is reproduced.

### 2.3 Exact response labels

Use the following order for every scored item. The numeric values are scoring metadata, not levels of ability.



| Response value | English content            | Simplified Chinese content |
| -------------- | -------------------------- | -------------------------- |
| 1              | Strongly disagree          | 非常不认同                      |
| 2              | Disagree                   | 不认同                        |
| 3              | Neutral                    | 中立                         |
| 4              | Agree                      | 认同                         |
| 5              | Strongly agree             | 非常认同                       |

There is no non-scale response in BUGTI-Q3. Respondents imagine facing the scenario even without prior experience and select one of the five agreement categories. Neutral contributes zero oriented points and remains an effective response; lack of prior experience is not automatically neutral. Unanswered draft items remain absent and prevent submission.

The test measures stated preferences in hypothetical situations. This change does not establish that imagined choices predict real behavior. Review comprehension, idealized answers, and differences between imagined and experienced decisions during validation.

## 3. Instructions shown to respondents

### English content

> This questionnaire has 32 statements about preferences behind coding decisions. It is intended to take about 7–10 minutes; you can take longer if needed.
> Imagine facing each situation and choose how you would prefer to act. You do not need to have experienced it. Assume you understand the described choices and can carry out either approach; you are choosing a preference, not rating your skill.
> Assume you have a reasonable choice and enough time to choose. Every option must still meet necessary requirements for correctness, security, compliance, and reliability. Answer based on what you would prefer within those requirements, rather than a team's mandatory rules or an emergency deadline.
> Rate how well each statement matches your preferred action in that imagined situation. There are no better or worse preferences and no right answers. Choose “Neutral” if, after understanding the scenario, you have no overall leaning. All 32 statements need an agreement response.
> The result describes your responses in this context. BUGTI has not been scientifically validated and does not assess your engineering ability.

### Simplified Chinese content

> 这份问卷有 32 道题，了解你在编程决策中的偏好。预计用时约 7–10 分钟，你也可以按自己的节奏完成。
> 请假设自己遇到了每道题中的情境，回答更愿意怎样做。没有相关经历也可以按假设作答。假设你理解题目描述的选择，也能完成两种做法；这里问的是偏好，不是技术能力。
> 请假设你有合理的选择空间，也有足够的决策时间。所有选择仍需满足正确性、安全、合规和可靠性的必要要求。在这些前提下，回答你自己的偏好，不必按团队的强制规定或紧急赶工时的做法回答。
> 请判断每句话与你在假设情境中更愿意采取的做法有多相符。偏好没有高下，题目没有标准答案。理解情境后仍没有总体倾向，可以选择“中立”。32 道题都需要选择一个认同等级。
> 结果只描述你在这些情境中的回答。BUGTI 尚未经过科学验证，也不评估你的工程能力。

“Enough time” removes emergency pressure; it does not mean unlimited implementation time or an unlimited budget. Ordinary implementation and maintenance costs remain part of the trade-offs. Respondents should answer in one language, not read two copies of every statement.

## 4. Construct coverage and scoring key

### 4.1 Construct definitions

Preserve the order **C/D, F/G, R/E, U/A**. Use the existing identifiers **control, constraints, cognition, values**, respectively.



* **C/D — Control / Delegation:** preferred ownership of mechanisms and responsibility for their adjustment. Holding controls differs from knowing how a tool works. Delegating differs from accepting untrustworthy tools.

* **F/G — Flexibility / Guarantees:** preferred amount and location of implementation constraints. Flexibility retains room for composition and change within necessary safeguards. Guarantees encode allowed behavior earlier. Neither implies ignoring requirements.

* **R/E — Reasoning / Experimentation:** preferred first source of information under uncertainty. Both may subsequently combine models, tests, and observations. Neither implies refusing evidence or thinking poorly.

* **U/A — Utility / Aesthetics:** what justifies additional investment once necessary quality is met. Utility prioritizes a practical return. Aesthetics also values coherent concepts and expression intrinsically. Aesthetics concerns code and design, not visual decoration.

The four proposed facets under each dimension are **coverage categories**, not independently validated subscales. All statements are hypothetical decisions, not reports of habitual past behavior. Related items sample different decisions within each category; they are not paired retellings of one situation with the preferred action reversed. They must not be turned into sixteen additional personality scores.

Each statement gives a recognizable programming situation and an action the respondent can imagine taking. Keep shared safety and quality assumptions in the instructions instead of repeating abstract qualifications in every item. Necessary correctness and maintenance repairs remain outside optional aesthetic trade-offs. Do not use absolute words such as “only” to turn an ordinary preference into a rule that excludes other reasonable practical benefits.

When a statement tests willingness to accept a cost, state a meaningful cost instead of softening it to “some extra effort.” Let the agreement response express whether the respondent accepts that trade-off. Keep the scenario and degree of cost aligned in both languages. Do not mechanically intensify every item: preserve coverage of ordinary and demanding decisions, and do not award extra scoring weight for stronger wording. “Much more time” expresses a substantial relative cost; if interviews reveal materially different interpretations, anchor it to a concrete scenario or time comparison before validation.

### 4.2 Coverage matrix



| Dimension        | Coverage facet                                             | Left-pole scenario                                   | Right-pole scenario                                        |
| ---------------- | ---------------------------------------------------------- | ---------------------------------------------------- | ---------------------------------------------------------- |
| control: C/D     | Visibility versus abstraction boundaries                   | Q01: inspectable framework request handling (C)      | Q05: delegate database differences (D)                     |
| control: C/D     | Locally configured versus externally maintained mechanisms | Q13: directly configured retries (C)                 | Q09: a small reusable open-source module (D)               |
| control: C/D     | Modification versus supported extension                    | Q17: a locally maintained library modification (C)   | Q21: logging through a supported plugin (D)                |
| control: C/D     | Explicit orchestration versus platform ownership           | Q29: manually wired dependencies (C)                 | Q25: platform-managed build steps (D)                      |
| constraints: F/G | Open versus constrained data representations               | Q06: extensible objects in a small script (F)        | Q02: separate success and failure types (G)                |
| constraints: F/G | Composable versus signature-restricted operations          | Q10: freely ordered data processing (F)              | Q14: separate mutually exclusive API methods (G)           |
| constraints: F/G | Adjustable workflows versus predefined transitions         | Q22: changing experimental-feature configuration (F) | Q18: task-state transitions (G)                            |
| constraints: F/G | Context-dependent versus predefined permitted rules        | Q26: validation choices at business call sites (F)   | Q30: supported operating-mode configurations (G)           |
| cognition: R/E   | Initial approach to debugging                              | Q03: infer an unexpected return value (R)            | Q07: reproduce an intermittent error (E)                   |
| cognition: R/E   | Initial approach to performance investigation              | Q15: estimate loop and query costs (R)               | Q11: benchmark candidate algorithms (E)                    |
| cognition: R/E   | Initial approach to unfamiliar mechanisms                  | Q19: model cache expiration and invalidation (R)     | Q23: implement a feature with a new framework (E)          |
| cognition: R/E   | Initial approach to uncertain boundaries                   | Q31: sketch concurrent execution orders (R)          | Q27: try different batch sizes (E)                         |
| values: U/A      | Practical need versus intrinsic structural value           | Q04: a new requirement triggers refactoring (U)      | Q08: choose a coherent new implementation (A)              |
| values: U/A      | Practical communication versus precise expression          | Q16: documentation sized to an internal audience (U) | Q12: distinguish already understandable variable names (A) |
| values: U/A      | Demonstrated reuse versus explicit concepts                | Q24: actual repeated edits trigger a helper (U)      | Q20: a single-use concept gets its own abstraction (A)     |
| values: U/A      | Migration costs versus consistency                         | Q28: retain understandable public API names (U)      | Q32: align internal implementations in review (A)          |

### 4.3 Universal item-scoring rule

Let $r_i$ be the selected response value, from 1 to 5. Let $k_i$ be the item key: positive one for an item endorsing the left pole (C, F, R, U), negative one for an item endorsing the right pole (D, G, E, A). Every weight is $w_i=1$.

$ 
s_i=k_i(r_i-3).
 $

In response order 1, 2, 3, 4, 5:



* A left-pole item contributes $(-2,-1,0,1,2)$ to its dimension.

* A right-pole item contributes $(2,1,0,-1,-2)$ to its dimension.

Positive scores point left; negative scores point right. A positive score is not a favorable rating. Stronger agreement contributes more evidence for the pole stated in the item; the opposite scoring follows the **proposed bipolar interpretation**, which requires validation. Disagreement with one statement alone is not proof of a complete opposite personality.

Opposite-pole items use affirmative descriptions of the other preference. They do not rely on grammatical tricks such as inserting “not” into an otherwise identical sentence. Reverse wording can introduce method effects and comprehension problems; clear alternative-pole wording still needs response-process testing. \[S6]

## 5. Complete item content

Use the order Q01 through Q32 for the initial questionnaire. The dimensions are interleaved, and every group of four includes one item from each dimension. Scoring directions are balanced within each complete dimension, not necessarily within each group of four. Keep IDs stable if an item is reordered. Do not display the dimension, key, weight, or rationale as part of the item statement.

Every item contributes only to its named dimension. The vectors below are complete scoring instructions for all five response choices, always in the order defined in Section 2.3.

### Q01 — Inspectable request handling

**Simplified Chinese:** 两个框架都能完成需求时，我更愿意选请求处理过程容易查看的那个，即使接入步骤更多。

**English:** When two frameworks both meet my needs, I would prefer the one with an inspectable request-handling process, even if setup takes more steps.



* Dimension: control, C/D. Agreement endorses **C**.

* Key: $k_{01}=1$. Weight: $w_{01}=1$.

* Score: $s_{01}=r_{01}-3$; response scores $(-2,-1,0,1,2)$.

* Rationale: extra integration effort is acceptable in exchange for visibility into request handling. Both options are suitable; the item asks for a choice, not source-reading ability.

### Q02 — Separate success and failure results

**Simplified Chinese:** 一个接口会返回成功或失败时，我倾向把两种结果分开定义，让代码提前限制各自能携带的字段。

**English:** If an API can return success or failure, I would define separate result types so the code restricts the fields each can contain upfront.



* Dimension: constraints, F/G. Agreement endorses **G**.

* Key: $k_{02}=-1$. Weight: $w_{02}=1$.

* Score: $s_{02}=3-r_{02}$; response scores $(2,1,0,-1,-2)$.

* Rationale: known valid combinations are enforced by the representation. An alternative representation with checks can also meet requirements. No particular language or coding skill is scored.

### Q03 — Trace an unexpected result

**Simplified Chinese:** 一个函数返回了意外结果时，我会先沿调用链读代码，推断问题可能出在哪一步，再运行验证。

**English:** When a function returns an unexpected result, I would read along its call chain to infer where the problem might be before running a check.



* Dimension: cognition, R/E. Agreement endorses **R**.

* Key: $k_{03}=1$. Weight: $w_{03}=1$.

* Score: $s_{03}=r_{03}-3$; response scores $(-2,-1,0,1,2)$.

* Rationale: code-based inference determines the first check in a concrete debugging task. Verification remains part of the process.

### Q04 — Refactoring triggered by a new requirement

**Simplified Chinese:** 一段代码已通过现有测试，维护也没有明显问题时，我会等到它妨碍新需求的实现，才考虑重构。

**English:** When code passes existing tests and has no evident maintenance problems, I would wait until it gets in the way of implementing a new requirement before considering refactoring.



* Dimension: values, U/A. Agreement endorses **U**.

* Key: $k_{04}=1$. Weight: $w_{04}=1$.

* Score: $s_{04}=r_{04}-3$; response scores $(-2,-1,0,1,2)$.

* Rationale: an actual requirement triggers optional restructuring of working code. The maintenance condition avoids treating ignored defects or risks as Utility. Passing tests alone is not declared sufficient quality. Q08 instead concerns choosing between new implementations, not another reason to refactor this code.

### Q05 — Delegate database differences

**Simplified Chinese:** 项目需要支持多种数据库时，只要现成的数据访问工具能满足需求，我倾向让它处理数据库之间的差异。

**English:** When a project must support several databases, I would prefer an existing data-access tool to handle their differences if it meets the requirements.



* Dimension: control, C/D. Agreement endorses **D**.

* Key: $k_{05}=-1$. Weight: $w_{05}=1$.

* Score: $s_{05}=3-r_{05}$; response scores $(2,1,0,-1,-2)$.

* Rationale: responsibility for backend differences stays behind a suitable abstraction. Knowledge of databases, performance trade-offs, and tool names are not assessed.

### Q06 — Extend data in a small script

**Simplified Chinese:** 写需求还会变化的小脚本时，我倾向让数据对象可以随时增加字段，在读取字段时检查是否合适。

**English:** In a small script with evolving requirements, I would prefer data objects that can gain fields as needed, with suitability checks when the fields are read.



* Dimension: constraints, F/G. Agreement endorses **F**.

* Key: $k_{06}=1$. Weight: $w_{06}=1$.

* Score: $s_{06}=r_{06}-3$; response scores $(-2,-1,0,1,2)$.

* Rationale: open representations with checks at use sites preserve adjustment freedom in a bounded task. The response does not endorse skipping validation or mandatory safety checks.

### Q07 — Reproduce an intermittent bug

**Simplified Chinese:** 遇到偶尔才出现的错误时，我会先缩小输入范围，反复运行出错场景，再分析原因。

**English:** When a bug occurs intermittently, I would narrow the inputs and rerun the failing scenario before analyzing its cause.



* Dimension: cognition, R/E. Agreement endorses **E**.

* Key: $k_{07}=-1$. Weight: $w_{07}=1$.

* Score: $s_{07}=3-r_{07}$; response scores $(2,1,0,-1,-2)$.

* Rationale: reproduction supplies the first evidence for an intermittent problem. This differs from Q03's unexpected return-value scenario and does not assess patience or debugging success.

### Q08 — Choose a more coherent new implementation

**Simplified Chinese:** 两种实现都能完成同一个功能时，即使多花很多时间，我也愿意选职责划分更清楚、结构更协调的那种。

**English:** When two implementations can deliver the same feature, I would be willing to spend much more time on the one with clearer responsibilities and a more coherent structure.



* Dimension: values, U/A. Agreement endorses **A**.

* Key: $k_{08}=-1$. Weight: $w_{08}=1$.

* Score: $s_{08}=3-r_{08}$; response scores $(2,1,0,-1,-2)$.

* Rationale: willingness to accept a substantial time cost for structural coherence during implementation choice. Both choices satisfy baseline requirements, and no concrete reduction in defects or maintenance cost is promised. Agreement still endorses A with the same weight; the stronger cost condition must not receive bonus points. Disagreement can reflect unwillingness to pay this cost rather than rejection of coherent structure, so cost sensitivity must be checked during validation. This is distinct from Q04's trigger for revisiting existing code.

### Q09 — Reuse a small open-source module

**Simplified Chinese:** 即使只是一个小的可复用模块，只要有符合需求的成熟开源库，我也更倾向于选择开源库，而不是自己实现。

**English:** Even for a small reusable module, I would prefer a mature open-source library that meets my needs over implementing my own version.



* Dimension: control, C/D. Agreement endorses **D**.

* Key: $k_{09}=-1$. Weight: $w_{09}=1$.

* Score: $s_{09}=3-r_{09}$; response scores $(2,1,0,-1,-2)$.

* Rationale: willingness to delegate a general implementation even when writing it locally would be feasible. Suitability includes license, dependency, security, and maintenance requirements under the common instructions. This measures the intended ownership preference, not whether adding any dependency is good practice. Dependency aversion and effort savings remain confounds to check.

### Q10 — Compose processing steps freely

**Simplified Chinese:** 写一组前后衔接的数据处理函数时，我倾向让调用者自由调整顺序，在运行时检查上一步输出能否供下一步使用。

**English:** When writing linked data-processing functions, I would let callers choose the order and check at runtime whether each step can use the previous step’s output.



* Dimension: constraints, F/G. Agreement endorses **F**.

* Key: $k_{10}=1$. Weight: $w_{10}=1$.

* Score: $s_{10}=r_{10}-3$; response scores $(-2,-1,0,1,2)$.

* Rationale: callers retain composition choices with runtime checks. The scenario concerns where constraints live, not whether incompatible data should be processed.

### Q11 — Benchmark two candidate algorithms

**Simplified Chinese:** 不确定两种算法哪种更快时，我会先用项目中的典型数据跑一次对比，再决定重点研究哪种。

**English:** If I am unsure which of two algorithms is faster, I would compare them on typical project data before deciding which to investigate further.



* Dimension: cognition, R/E. Agreement endorses **E**.

* Key: $k_{11}=-1$. Weight: $w_{11}=1$.

* Score: $s_{11}=3-r_{11}$; response scores $(2,1,0,-1,-2)$.

* Rationale: a comparison measurement starts algorithm evaluation. A first benchmark is not treated as a final proof, and benchmarking expertise is not scored.

### Q12 — Refine names after a feature works

**Simplified Chinese:** 功能写完、变量名也能看懂后，我仍愿意花时间，把含义相近却不完全相同的变量命名区分开。

**English:** After a feature works and its variable names are understandable, I would still spend time distinguishing the names of variables with similar but different meanings.



* Dimension: values, U/A. Agreement endorses **A**.

* Key: $k_{12}=-1$. Weight: $w_{12}=1$.

* Score: $s_{12}=3-r_{12}$; response scores $(2,1,0,-1,-2)$.

* Rationale: additional precision of expression has value after basic comprehension is achieved. Ambiguous or incorrect names requiring repair are outside this optional trade-off.

### Q13 — Configure retry behavior directly

**Simplified Chinese:** 请求失败后需要自动重试时，我更愿意自己设置重试次数和间隔，即使成熟工具的默认策略也能满足需求。

**English:** If failed requests need automatic retries, I would prefer to set retry counts and intervals myself, even if a mature tool’s defaults meet the requirements.



* Dimension: control, C/D. Agreement endorses **C**.

* Key: $k_{13}=1$. Weight: $w_{13}=1$.

* Score: $s_{13}=r_{13}-3$; response scores $(-2,-1,0,1,2)$.

* Rationale: direct adjustment of a concrete operating policy matters even when a default is suitable. The permitted range of settings and necessary safeguards are not in dispute, distinguishing mechanism control from F/G.

### Q14 — Separate mutually exclusive API operations

**Simplified Chinese:** 一个接口有几种不能同时使用的调用方式时，我倾向拆成不同的方法，让每个方法只接受对应的参数。

**English:** If an API has invocation modes that cannot be combined, I would use separate methods that each accept only the parameters for that mode.



* Dimension: constraints, F/G. Agreement endorses **G**.

* Key: $k_{14}=-1$. Weight: $w_{14}=1$.

* Score: $s_{14}=3-r_{14}$; response scores $(2,1,0,-1,-2)$.

* Rationale: signatures encode allowed usage instead of leaving mode compatibility to a shared call. Either approach can validate inputs; the item does not ask who owns the API implementation.

### Q15 — Estimate the cost of a slow data task

**Simplified Chinese:** 一段反复循环、查询数据的程序变慢时，我会先估算循环次数和每次查询的开销，再决定测量哪一部分。

**English:** If a program with repeated loops and data queries slows down, I would estimate loop counts and per-query costs before deciding what to measure.



* Dimension: cognition, R/E. Agreement endorses **R**.

* Key: $k_{15}=1$. Weight: $w_{15}=1$.

* Score: $s_{15}=r_{15}-3$; response scores $(-2,-1,0,1,2)$.

* Rationale: a rough cost model selects the first measurement target. This is a different performance task from Q11, and subsequent measurements remain necessary.

### Q16 — Limit documentation to actual use

**Simplified Chinese:** 给几位同事写一个内部小工具时，我倾向只补充他们使用时需要的说明，等使用范围扩大后再写完整文档。

**English:** For an internal tool used by a few colleagues, I would prefer instructions for their actual use and defer full documentation until its audience grows.



* Dimension: values, U/A. Agreement endorses **U**.

* Key: $k_{16}=1$. Weight: $w_{16}=1$.

* Score: $s_{16}=r_{16}-3$; response scores $(-2,-1,0,1,2)$.

* Rationale: documentation effort is sized to an existing audience and use. Essential safety, operation, and handover instructions are included. This does not reward undocumented work or repeat Q12's naming choice.

### Q17 — Maintain a small change to library internals

**Simplified Chinese:** 一个库只差一处内部行为就能符合需求时，我愿意维护一份修改过的版本，以便直接控制这处行为。

**English:** When one internal behavior prevents a library from meeting my needs, I would be willing to maintain a modified version to control that behavior directly.



* Dimension: control, C/D. Agreement endorses **C**.

* Key: $k_{17}=1$. Weight: $w_{17}=1$.

* Score: $s_{17}=r_{17}-3$; response scores $(-2,-1,0,1,2)$.

* Rationale: taking on local maintenance provides direct control of a change. A permitted, supportable modification is assumed; skill at forking libraries and disregard for licenses or security are not scored.

### Q18 — Restrict task-state transitions

**Simplified Chinese:** 任务有待处理、进行中、已完成等状态时，我倾向提前列出允许的切换，让更新方法只接受这些切换。

**English:** If a task has pending, active, and completed states, I would list allowed transitions upfront and restrict its update method to those transitions.



* Dimension: constraints, F/G. Agreement endorses **G**.

* Key: $k_{18}=-1$. Weight: $w_{18}=1$.

* Score: $s_{18}=3-r_{18}$; response scores $(2,1,0,-1,-2)$.

* Rationale: allowed transitions are encoded in the update boundary. Validated generic updates are another possible compliant design; preference for explicit restrictions is the target.

### Q19 — Model cache behavior before trying it

**Simplified Chinese:** 考虑把接口结果暂存以减少重复查询时，我会先理清数据能保留多久、更新后何时清除，再做试验。

**English:** If storing API results could reduce repeated queries, I would work out how long to retain them and when updates should clear them before experimenting.



* Dimension: cognition, R/E. Agreement endorses **R**.

* Key: $k_{19}=1$. Weight: $w_{19}=1$.

* Score: $s_{19}=r_{19}-3$; response scores $(-2,-1,0,1,2)$.

* Rationale: a behavior model is the first step in investigating a cache. Expiration and invalidation are parts of that one model, not separate scored preferences. Both poles must ultimately address cache correctness.

### Q20 — Give a single-use domain concept its own abstraction

**Simplified Chinese:** 一个业务概念目前只用到一次时，我也愿意为它单独写一个类或模块，让它在代码里有清楚的位置。

**English:** Even when a business concept appears only once, I would be willing to give it its own class or module so it has a clear place in the code.



* Dimension: values, U/A. Agreement endorses **A**.

* Key: $k_{20}=-1$. Weight: $w_{20}=1$.

* Score: $s_{20}=3-r_{20}$; response scores $(2,1,0,-1,-2)$.

* Rationale: expressing a concept separately can justify abstraction without reuse. No automatic correctness guarantee is promised, and this is not a general preference for adding layers. Q24 examines actual repetition in different code.

### Q21 — Extend logging through supported plugins

**Simplified Chinese:** 需要给日志增加自定义信息时，只要现成日志库提供的扩展接口能做到，我倾向通过这个接口添加，把内部处理继续交给库。

**English:** If logs need custom information and an existing logging library’s extension interface supports it, I would use that interface and leave internal processing to the library.



* Dimension: control, C/D. Agreement endorses **D**.

* Key: $k_{21}=-1$. Weight: $w_{21}=1$.

* Score: $s_{21}=3-r_{21}$; response scores $(2,1,0,-1,-2)$.

* Rationale: customization stays at a supported extension boundary. Unlike Q17, this concerns a feasible logging extension, not the exact opposite answer to an internal-library defect.

### Q22 — Adjust an evolving configuration

**Simplified Chinese:** 一个实验功能还在频繁变化时，我倾向先用可增减的配置项控制它，在读取配置时检查组合是否合法。

**English:** For a frequently changing experimental feature, I would prefer adjustable configuration options, with their combinations checked when the configuration is read.



* Dimension: constraints, F/G. Agreement endorses **F**.

* Key: $k_{22}=1$. Weight: $w_{22}=1$.

* Score: $s_{22}=r_{22}-3$; response scores $(-2,-1,0,1,2)$.

* Rationale: configuration retains composition freedom while checks still enforce required legality. This examines evolving feature options, not the inverse of Q18's task-state transition design.

### Q23 — Try a framework on a small feature

**Simplified Chinese:** 评估一个新框架时，我会先用它写一个小功能，遇到具体问题后再深入读文档。

**English:** When evaluating a new framework, I would implement a small feature with it before reading the documentation in depth about specific issues.



* Dimension: cognition, R/E. Agreement endorses **E**.

* Key: $k_{23}=-1$. Weight: $w_{23}=1$.

* Score: $s_{23}=3-r_{23}$; response scores $(2,1,0,-1,-2)$.

* Rationale: hands-on experience directs further learning. Basic setup and safety instructions are still followed. The item concerns evaluation, not deploying an unfamiliar framework untested.

### Q24 — Extract helpers after duplication appears

**Simplified Chinese:** 几段相似代码都很短、也各自容易修改时，我倾向先保留它们，等重复修改成了负担再提取公共函数。

**English:** When similar code blocks are short and easy to change independently, I would prefer to keep them until repeated edits become burdensome before extracting a shared function.



* Dimension: values, U/A. Agreement endorses **U**.

* Key: $k_{24}=1$. Weight: $w_{24}=1$.

* Score: $s_{24}=r_{24}-3$; response scores $(-2,-1,0,1,2)$.

* Rationale: demonstrated maintenance burden triggers a shared abstraction. Known defects or costly divergence are excluded by the scenario; duplication is not automatically treated as harmless.

### Q25 — Delegate builds to an existing platform

**Simplified Chinese:** 现成平台已能把代码编译、测试并打包时，我倾向让它安排这些步骤，把步骤的维护交给平台。

**English:** If an existing platform can compile, test, and package the code, I would let it arrange and maintain those steps.



* Dimension: control, C/D. Agreement endorses **D**.

* Key: $k_{25}=-1$. Weight: $w_{25}=1$.

* Score: $s_{25}=3-r_{25}$; response scores $(2,1,0,-1,-2)$.

* Rationale: continuing responsibility for general build orchestration is delegated to a suitable platform. No particular hosting provider, permissions policy, or build-system competence determines the score.

### Q26 — Keep validation rules at business call sites

**Simplified Chinese:** 几个业务场景的数据检查规则略有差异时，我倾向让各自的调用代码选择检查规则，保留调整空间。

**English:** When data checks differ slightly across business contexts, I would prefer each call site to choose its checks and retain room for adjustment.



* Dimension: constraints, F/G. Agreement endorses **F**.

* Key: $k_{26}=1$. Weight: $w_{26}=1$.

* Score: $s_{26}=r_{26}-3$; response scores $(-2,-1,0,1,2)$.

* Rationale: required validation remains, with contextual choice at the call site. The item asks where allowed variation is decided, not whether checks can be bypassed.

### Q27 — Measure batch-size limits

**Simplified Chinese:** 不确定批量处理一次放多少数据合适时，我会先试几种批量大小，从耗时和失败情况中找范围。

**English:** When unsure how much data to process per batch, I would try several batch sizes and use timings and failures to identify a workable range.



* Dimension: cognition, R/E. Agreement endorses **E**.

* Key: $k_{27}=-1$. Weight: $w_{27}=1$.

* Score: $s_{27}=3-r_{27}$; response scores $(2,1,0,-1,-2)$.

* Rationale: bounded experiments provide initial evidence about capacity. Trials are performed in a safe evaluation setting; few successful batches do not establish universal limits.

### Q28 — Keep an awkward but usable public API

**Simplified Chinese:** 一个旧接口的命名不够整齐，但使用者都能理解时，我倾向保留它，减少调用方跟着改名的工作。

**English:** When an older API's naming is untidy but users understand it, I would prefer to keep it and avoid requiring callers to rename their usage.



* Dimension: values, U/A. Agreement endorses **U**.

* Key: $k_{28}=1$. Weight: $w_{28}=1$.

* Score: $s_{28}=r_{28}-3$; response scores $(-2,-1,0,1,2)$.

* Rationale: caller migration cost outweighs optional naming tidiness. The API is usable and compliant. This is an external compatibility decision, not Q32's internal style alignment.

### Q29 — Wire dependencies explicitly

**Simplified Chinese:** 框架可以自动找到并连接模块时，我仍更愿意在代码里明确写出谁依赖谁，即使多写一些连接代码。

**English:** If a framework can discover and connect modules automatically, I would still state which module depends on which in code, even if that requires additional wiring.



* Dimension: control, C/D. Agreement endorses **C**.

* Key: $k_{29}=1$. Weight: $w_{29}=1$.

* Score: $s_{29}=r_{29}-3$; response scores $(-2,-1,0,1,2)$.

* Rationale: explicit dependency wiring preserves local visibility and adjustment of a mechanism. It does not claim stronger types or fewer invalid states than automatic wiring. Both choices can use the same guarantees.

### Q30 — Enumerate supported configuration combinations

**Simplified Chinese:** 给工具增加几种运行模式时，我倾向提前定义每种模式允许的配置，让配置检查直接拒绝其它组合。

**English:** When adding operating modes to a tool, I would prefer to define allowed configurations for each mode upfront and reject other combinations during configuration checks.



* Dimension: constraints, F/G. Agreement endorses **G**.

* Key: $k_{30}=-1$. Weight: $w_{30}=1$.

* Score: $s_{30}=3-r_{30}$; response scores $(2,1,0,-1,-2)$.

* Rationale: known supported combinations become explicit constraints. A different design may allow more valid combinations with context-sensitive checks; neither choice implies accepting unsafe configurations. This differs from Q26's rules distributed across business callers.

### Q31 — Sketch concurrent execution before testing

**Simplified Chinese:** 两个任务可能同时读写同一份数据时，我会先画出可能的执行顺序，推断冲突点，再写测试验证。

**English:** If two tasks might read and write the same data at the same time, I would sketch execution orders and infer conflict points before testing them.



* Dimension: cognition, R/E. Agreement endorses **R**.

* Key: $k_{31}=1$. Weight: $w_{31}=1$.

* Score: $s_{31}=r_{31}-3$; response scores $(-2,-1,0,1,2)$.

* Rationale: reasoning about possible interleavings starts a concurrency investigation. This differs from Q27's batch-capacity experiments. Neither successful testing nor concurrency expertise is scored.

### Q32 — Align internal implementations during review

**Simplified Chinese:** 代码评审中看到两个内部模块做法不同、但都清楚易懂时，我仍愿意多花时间，让相同的逻辑采用一致写法。

**English:** In code review, when two internal modules use different but understandable approaches, I would still want to spend time expressing the same logic consistently.



* Dimension: values, U/A. Agreement endorses **A**.

* Key: $k_{32}=-1$. Weight: $w_{32}=1$.

* Score: $s_{32}=3-r_{32}$; response scores $(2,1,0,-1,-2)$.

* Rationale: internal consistency warrants additional effort without a stated defect or maintenance payoff. The scenario is about optional expression consistency, not enforcing mandatory format rules or changing a public API as in Q28.

## 6. Dimension scoring and interpretation

### 6.1 Complete dimension scores

A current result requires **all 32 numeric responses**, so all eight items in each dimension are scored. Neutral is a valid response. Let $I_d$ be that dimension's eight item IDs.

$ 
S_d=\frac{1}{8}\sum_{i\in I_d}s_i,\qquad -2\leq S_d\leq2.
 $

The complete keys are:



| Dimension   | Positive-key IDs   | Negative-key IDs   |
| ----------- | ------------------ | ------------------ |
| control     | Q01, Q13, Q17, Q29 | Q05, Q09, Q21, Q25 |
| constraints | Q06, Q10, Q22, Q26 | Q02, Q14, Q18, Q30 |
| cognition   | Q03, Q15, Q19, Q31 | Q07, Q11, Q23, Q27 |
| values      | Q04, Q16, Q24, Q28 | Q08, Q12, Q20, Q32 |

Do not sum the four dimension scores into a global personality, ability, or quality score. Do not weight them by the website's browsing groups.

Numeric response categories are ordinal. The unit-weighted composite is a transparent initial scoring convention, not a demonstrated interval-scale measurement of a latent personality. Validate that convention using ordinal models and response-process evidence. Do not invent unequal weights on the basis of which item sounds more diagnostic. \[S5, S6]

### 6.2 Optional normalized response index

If a bounded response index is useful for interpretation, convert the complete score as follows:

$ 
P_{d,L}=25(S_d+2),\qquad P_{d,R}=100-P_{d,L}.
 $

This is only a linear rescaling of the observed composite:



* 0 points means the complete answers maximally favor the right pole.

* 50 points means the oriented answers balance overall.

* 100 points means the complete answers maximally favor the left pole.

Use “response index” or “points.” These values are **not** a population percentile, probability of a type, percentage of the person belonging to a pole, accuracy, confidence level, or percentage of engineering competence. Do not write “you are 75% Control.” The right index is the complement of the same bipolar index, not an independently measured trait score.

Preserve the raw answers and unrounded oriented sum conceptually in the specification. Determine the direction from the exact sum, never from a rounded normalized value. With eight five-category items, there are only **33 attainable complete composite values**. Additional decimal places do not create more information.

### 6.3 Descriptive direction and exact ties

For a complete dimension:

$ 
\operatorname{direction}_d=
\begin{cases}
L_d,&\sum_{i\in I_d}s_i>0,\\
R_d,&\sum_{i\in I_d}s_i<0,\\
\text{balanced},&\sum_{i\in I_d}s_i=0.
\end{cases}
 $

A direction means the answers tilt that way in this questionnaire. It is not a statistically established classification. Do not introduce unsupported thresholds such as “60 points is a strong preference” or “80 points is scientifically certain.”

When a dimension is exactly balanced, retain both pole possibilities. Do not resolve it using the last answer, first pole, random selection, presumed population proportions, favorite programming language, or personality-group hierarchy. No extra tiebreaker questions are added in this version.

### 6.4 Type codes and historical incomplete results



* If all dimensions are complete and have nonzero scores, concatenate the descriptive pole letters in **C/D, F/G, R/E, U/A** order. Any mapped archetype is a descriptive summary of the answers, with the unvalidated status retained.

* If one or more dimensions are exactly balanced, return **no single assigned type**. A candidate set may be formed by taking both letters for each tied dimension while keeping the other descriptive directions fixed. With $t$ tied dimensions, the candidate count is $2^t$.

* Current submissions require 32 valid numeric answers, so completed BUGTI-Q3 results have no incomplete dimension. In historical BUGTI-Q2.1 results, retain **insufficient responses** for an incomplete dimension and no complete type; do not impute a direction.

* An exactly balanced dimension and an incomplete dimension are different states. Neither should be disguised as a default pole.

* If all dimensions are balanced, describe that there is no overall directional tilt. Do not print all sixteen archetype descriptions as if sixteen personalities had been measured.

A slightly nonzero complete score may produce a descriptive four-letter shorthand, but the boundary sensitivity in Section 6.6 must accompany it. It must not be described as the uniquely correct personality.

### 6.5 Preserve endorsement of each pole

The proposed bipolar model should not hide respondents who endorse both approaches or neither approach. For a complete dimension, calculate the mean raw response to its four left-keyed statements and to its four right-keyed statements:

$ 
M_{d,L}=\frac{1}{4}\sum_{i\in I_{d,L}}r_i,\qquad
M_{d,R}=\frac{1}{4}\sum_{i\in I_{d,R}}r_i.
 $

Their relation to the oriented composite is:

$ 
S_d=\frac{M_{d,L}-M_{d,R}}{2}.
 $

Keep these as response-pattern diagnostics, not additional validated trait scales:



* If both means exceed 3, responses endorse statements on both sides on average.

* If both means are below 3, responses reject statements on both sides on average.

* If both means equal 3, responses show no average agreement direction on either set; this does not imply every individual response was a midpoint.

* A mean on exactly 3 and another elsewhere should simply be reported as observed, without inventing a special personality category.

High endorsement of both sides could reflect context sensitivity, acquiescence, or a failed bipolar construct. Low endorsement of both could reflect different preferences, interpretation problems, or missing coverage. The current questionnaire cannot determine which explanation is correct. Do not label such respondents dishonest or mentally inconsistent.

For example, agreeing strongly with all eight statements produces the same zero oriented score as choosing every midpoint, but the two pole means are different. The questionnaire must preserve that distinction. \[S7]

### 6.6 Arithmetic boundary sensitivity, not confidence

Changing one response by one category changes the dimension mean by:

$ 
\left|\Delta S_d\right|=\frac{1}{8}=0.125,
\qquad
\left|\Delta P_{d,L}\right|=\frac{25}{8}=3.125.
 $

Changing one response anywhere within the five-category scale can change the dimension mean by at most:

$ 
\left|\Delta S_d\right|\leq\frac{4}{8}=0.5,
\qquad
\left|\Delta P_{d,L}\right|\leq12.5.
 $

A conservative one-response envelope is therefore:

$ 
\left[\max(-2,S_d-0.5),\ \min(2,S_d+0.5)\right].
 $

If this envelope includes zero, describe the observed direction as **close to the arithmetic boundary**. At $\left|S_d\right|=0.5$, one full-range change may reach a tie; values strictly inside the envelope may permit a crossing. This is a worst-case upper bound, not proof that a feasible single change in the respondent's particular answers will cross the boundary. If $\left|S_d\right|>0.5$, no one-item change can reverse its direction under this rule, but several changes or measurement error still can.

This envelope is **not** a confidence interval, standard error, reliability estimate, clinical cut-off, or psychological definition of a strong preference. It derives solely from the declared arithmetic. Until an appropriate validated measurement model exists, do not generate statistical confidence intervals or claims such as “95% confident in your type.”

## 7. Nonresponse and answer-quality rules

### 7.1 Required responses and malformed data

- The current questionnaire accepts only integer agreement responses from 1 through 5. There is no Cannot judge response, skip value, or automatic midpoint substitution.
- Unanswered draft items are stored as null, count as unfinished, and cannot advance or generate a result. Do not convert them into 3 or zero oriented points.
- A result requires all 32 valid responses. Every dimension then has eight effective answers, including Neutral answers.
- Reject invalid categories, conflicting duplicates, incomplete result payloads, unknown IDs, and unsupported versions rather than guessing or clamping.
- Historical BUGTI-Q2.1 links retain their original statements and missing-answer semantics for viewing. They must not be relabeled as BUGTI-Q3 or automatically converted to current draft answers; an earlier Cannot judge answer does not become Neutral.
- This remains self-reflection, not a timed examination. No timer forces arbitrary answers.

If respondents cannot understand a scenario, simplify its description and investigate response processes rather than treating a forced response as evidence of validity. Analyze abandonment and item-comprehension feedback during research. Hypothetical responding may differ from actual behavior, so validate that interpretation directly. [S5, S6]

### 7.2 Response patterns



* All-midpoint answering is a legitimate response pattern and does not assign a pole.

* Uniform agreement or disagreement across mixed-key items balances the composite but reveals a different pole-endorsement pattern.

* Differences between two related items may reflect different scenarios. The pairs are not exact logical complements and are not lie detectors.

* Fast completion, long runs of one answer, and unusually variable answers are potential research-review signals only. Do not automatically delete, reweight, or invalidate individual results with uncalibrated thresholds.

* There are no attention-check traps or secret branch items in the 32-item user questionnaire. If a study adds unscored checks, disclose and version that study separately; they must not override personality scoring.

## 8. Worked scoring cases and acceptance vectors

These are synthetic arithmetic examples, not user data or validation evidence. Their purpose is to make future implementations testable without implementing scoring during this documentation task.

### 8.1 Control-dimension vectors

Use Q01, Q05, Q09, Q13, Q17, Q21, Q25, Q29 in that order. Their keys are positive, negative, negative, positive, positive, negative, negative, positive.



| Raw answers in that order         | Oriented sum | Dimension mean | Left response index | Pole means: left, right | Interpretation                                               |
| --------------------------------- | ------------ | -------------- | ------------------- | ----------------------- | ------------------------------------------------------------ |
| 5, 1, 1, 5, 5, 1, 1, 5            | 16           | 2              | 100                 | 5, 1                    | Maximum C-oriented response pattern                          |
| 1, 5, 5, 1, 1, 5, 5, 1            | -16          | -2             | 0                   | 1, 5                    | Maximum D-oriented response pattern                          |
| 3, 3, 3, 3, 3, 3, 3, 3            | 0            | 0              | 50                  | 3, 3                    | Exact balance with all midpoints                             |
| 5, 5, 5, 5, 5, 5, 5, 5            | 0            | 0              | 50                  | 5, 5                    | Exact balance with endorsement of both sides                 |
| 1, 1, 1, 1, 1, 1, 1, 1            | 0            | 0              | 50                  | 1, 1                    | Exact balance with rejection of both sides                   |
| 4, 2, 3, 4, 3, 2, 3, 4            | 5            | 0.625          | 65.625              | 3.75, 2.5               | C-oriented response pattern; not a probability or percentile |
| 4, 3, 3, 3, 3, 3, 3, 3            | 1            | 0.125          | 53.125              | 3.25, 3                 | Slight C tilt, close to arithmetic boundary                  |
| 5, 5, 1, 3, 3, 3, 3, 3            | 2            | 0.25           | 56.25               | 3.5, 3                  | C tilt; changing Q01 from 5 to 1 changes the sum to -2       |

### 8.2 Type construction



* Synthetic complete means $(1,-1,0.75,-0.75)$ in canonical order yield **CGRA**: C, G, R, A. Use the approved profile mapping only as a descriptive shorthand.

* Synthetic complete means $(0,1,-1,1)$ retain **CFEU** and **DFEU** as candidate codes and assign no single type.


* Four zero means produce no directional type, including the all-strongly-agree case.

### 8.3 Invariants for a future implementation



1. Exactly 32 stable IDs, eight items per dimension, four positive and four negative keys per dimension, and weight one for every item.

2. Every item has exactly the five category scores documented above. Moving an answer toward agreement changes the oriented score by positive one for a left-keyed item and negative one for a right-keyed item.

3. Every complete oriented sum is an integer from -16 through 16. Complete means and indices remain within their declared bounds.

4. Replacing every numeric response $r_i$ by $6-r_i$ negates every complete dimension mean and complements its normalized left index.

5. Item order does not change scoring. Reordering must preserve stable IDs and attached keys.

6. Uniform numeric responses give zero on every dimension because the keys balance. Pole means must still distinguish the uniform response levels.

7. No raw rounding influences tie handling or type construction. The zero sum is exact, and a nonzero sum remains nonzero.

8. A change to an item in one dimension does not alter the other three dimensions.

9. Missing or malformed data never produce a default direction or a complete type.

10. A questionnaire version cannot be rescored using another version's item map without an explicit compatibility rule.

## 9. Empirical validation requirements

This section specifies the work required to support scientific claims. None of the samples, findings, or thresholds below has been observed in BUGTI. The sequence follows scale-development guidance on content, response processes, internal structure, reliability, and external validity. \[S5, S6, S7]

### 9.1 Content and response-process review



* Have independent software practitioners and a psychometric methodologist review whether each item captures its intended preference, offers reasonable trade-offs, and avoids testing skill, seniority, tool familiarity, social desirability, or organizational constraints.

* Use cognitive interviews with approximately 12–15 varied programmers, in multiple rounds. Include professional and learning contexts, different specialties, and both intended languages. The cited guidance discusses 5–15 participants for cognitive interviewing; BUGTI's proposed target is a planning choice. \[S5, S6]

* Ask respondents to explain the scenario, paraphrase the statement, distinguish response labels, and say what examples informed their answers. In particular, test the meaning of hypothetical choice, assumed ability to perform either option, necessary quality, preferred first action, and Neutral. Check whether respondents answer their own preference rather than an idealized best practice.

* Review Q29 for overlap between explicit wiring and architectural tidiness, Q13 for overlap between direct retry control and guarantees, and Q20 for overlap between intrinsic conceptual value and general abstraction preference. Review Q09 for dependency aversion and effort savings; review Q04 to confirm that an answer reflects an optional refactoring trigger rather than willingness to ignore maintenance problems. These are content risks to investigate, not known defects.

* Review all related coverage items for duplicate decisions and scenario-specific knowledge. In particular, Q04/Q08, Q12/Q16, Q20/Q24, and Q28/Q32 must remain distinct situations rather than opposite answers to the same question. Concrete wording improves answerability as a design goal; it does not itself prove better measurement.

* If an item is judged overly obvious or normatively desirable, revise the trade-off rather than adding sarcastic or negative labels.

* The current 32 items form a complete proposed respondent questionnaire, not a claim that they are the best 32 items available. If interviews or item analyses reveal missing coverage, develop replacement candidates in a separate research pool; keep any eventual public questionnaire in the requested 30–40-item range.

### 9.2 Timing requirement

The design budget assumes about 10–15 seconds per statement, about 40 seconds for instructions, and about 60 seconds for review:

$ 
T=32t+40+60,\qquad 10\leq t\leq15.
 $

$ 
420\leq T\leq580\ \text{seconds},
 $

or roughly 7 minutes to 9 minutes 40 seconds. This is an assumption-based budget, not a measured completion-time claim.

**Timing acceptance target:** in a realistic pilot with roughly 30–50 target respondents completing independently, at least 90% of uninterrupted completions should finish within 10 minutes. Report the median, 90th percentile, abandonment, and per-item timing. Cognitive think-aloud sessions are not timing tests.

Record interruptions separately; do not quietly remove slow respondents or failed sessions to make the target look met. Analyze each language independently. If the target is missed, simplify confusing wording or replace low-value items while retaining 30–40 questions and balanced coverage. Do not claim that every individual is guaranteed to finish in 10 minutes.

### 9.3 Five-versus-seven comparison



* After cognitive revision, randomly assign comparable target respondents to five fully labeled or seven fully labeled agreement categories. Keep item content, instructions, and order the same; compare category count without also changing labeling.

* A suitable seven-category comparison uses: strongly disagree, disagree, somewhat disagree, neither agree nor disagree, somewhat agree, agree, strongly agree. Its Chinese labels should receive the same cognitive review.

* Compare category utilization, unclear-label reports, missingness, abandonment, completion time, corrected item–total relationships, model-based reliability, and meaningful external relations. Predefine practical decision criteria; do not select whichever format produces the highest alpha alone.

* Determine the sample size by simulation or a power/precision analysis for the planned comparison. Do not present a small convenience timing pilot as a psychometric superiority experiment.

* If seven categories show meaningful measurement gains without missing the timing target, revise the choice and create a new version. Do not mix category counts inside the same public questionnaire or compare scores across versions as if they were calibrated.

### 9.4 Structure, bipolarity, and reliability

Plan a development sample and a genuinely independent confirmation sample. Approximately **400 usable responses per sample** is an initial budgeting target, not a universal sufficient minimum. Final sizes depend on category distributions, missingness, loadings, model complexity, group comparisons, and simulated recovery of the intended structure. A total sample of 400 split into two groups of 200 is not equivalent to two independently planned samples of 400. \[S6]

Required analyses:



1. Inspect item distributions, sparse response categories, abandonment, comprehension feedback, and corrected item–total relationships. Do not remove content solely to increase internal consistency.

2. Conduct exploratory analysis using ordinal-appropriate associations, parallel analysis, and oblique rotation. The conceptual definitions do not establish that four statistically independent factors exist. \[S5, S6]

3. Test a correlated four-factor model using an ordinal estimator such as WLSMV/DWLS. Inspect loadings, cross-loadings, residual dependence, fit, and replicated performance together. Do not use a single fit-index threshold as a scientific pass certificate. \[S6]

4. Specifically test the bipolar assumption. Compare the proposed structure with plausible alternative-pole and response-style explanations. Examine whether endorsement on one pole consistently relates to lower endorsement on the other after accounting for method effects. Eight small four-item pole factors are an alternative research model, not an automatically valid replacement.

5. Estimate reliability for **each dimension's declared observed composite**, with uncertainty intervals. A latent-response ordinal coefficient is not automatically the reliability of the unit-weighted observed sum. Report the estimator and interpretation, alongside an appropriate model-based omega and alpha where justified. Never report one global alpha for all 32 heterogeneous items as proof of a valid personality test. \[S6, S7]

6. Invite about **100 or more** respondents for a retest after **2–4 weeks**, with unchanged version and recorded context changes. This is a planning target, not a completed study or fixed scientific law. Use a prespecified agreement method suited to repeated scores, report uncertainty, and inspect directional/type changes near the zero boundary. \[S6]

As project review targets, seek dimension reliability around **0.80 or higher** and adequate retest agreement for the intended self-reflection use. Values lower than that warrant review, particularly if individual type labels are emphasized. These are provisional review goals, not thresholds that confer validity; narrow repetitive items can make reliability look good while undermining coverage. The public claim must match the actual evidence. \[S6, S7]

**Stop rule:** if the bipolar model is not supported, do not keep turning disagreement into evidence for the opposite pole and continue calling it scientifically validated. Retain a clearly labeled reflective response index only if its purpose is defensible, or revise the constructs and scoring with a new specification. Any change to canonical codes or product scope requires an explicit product decision, not an automatic statistical rewrite.

### 9.5 External validity, language equivalence, and fairness



* Validate relevant preferences through independently designed scenario choices, interviews, or other suitable measures; those observations must not reuse the same statements as the criterion.

* Test prespecified convergent and discriminant hypotheses. Engineering skill, conscientiousness, risk tolerance, and familiarity with tools are possible confounds to examine. Do not use matching a favorite archetype as ground truth.

* Do not use MBTI, 16Personalities, or SBTI type agreement as proof that BUGTI is valid. Their constructs differ from these technical-preference definitions.

* Use bilingual expert review, independent back-translation, and reconciliation of Chinese and English wording. The translations in this document are proposed product copy, not demonstrated measurement equivalents.

* Investigate measurement invariance and item functioning across languages and relevant experience/specialty groups with sufficiently sized groups. Do not rank groups or compare population means when equivalence has not been established. \[S6, S7]

* Use only voluntary, consented research data; no data collection or identity linkage is authorized by this document-writing task.

### 9.6 Release and claims

An exploratory release uses the complete scoring convention while clearly retaining **“not scientifically validated”**. It must not present unmeasured reliability, effectiveness, accuracy, population norms, or confidence statistics. The answering and result flow is implemented locally; public deployment and empirical validation remain open.

Before making scientific-validity claims, publish a versioned report of the reviewed content, recruitment and inclusion criteria, response-format comparison, timing, dimensionality, reliability with intervals, retest agreement, external relations, missingness, language checks, limitations, and independent confirmation. Claim only the properties supported for the tested population and use.

Validity is evidence for a particular interpretation and use, not a property guaranteed forever by one coefficient. A successful scientific study would still not justify recruitment screening or high-stakes career decisions under BUGTI's current purpose. \[S5, S7]


### 9.7 Hypothetical-scenario content review

BUGTI-Q3 removes the non-scale response, keeps 32 items and unchanged dimension directions/weights, and changes habitual descriptions to intended actions. The following wording changes reduce dependence on prior specialist experience without introducing a new construct:

- Q02 explains separate success/failure representations as field restrictions.
- Q10 explains linked processing as one step consuming the previous output.
- Q11 states the concrete uncertainty: which of two algorithms is faster.
- Q13 explains automatic retries as retrying failed requests.
- Q14 replaces “mutually exclusive” with invocation modes that cannot be combined.
- Q15 supplies the missing situation: loops and repeated data queries.
- Q18 gives pending/active/completed examples for state changes.
- Q19 explains caching through temporarily stored results, retention, and clearing after updates.
- Q21 describes a supported logging extension without requiring plugin experience.
- Q25 explains build orchestration as compile, test, and package steps.
- Q29 describes dependency wiring through who depends on whom.
- Q31 supplies the shared-data concurrent-task scenario before asking how to investigate it.

The remaining items have sufficiently concrete scenarios for a first content draft and retain their trade-offs, including Q08's substantial time cost. No claim of demonstrated understandability is made. Validate with respondents who have and have not encountered each scenario, keeping content coverage, polarity, timing, and response-process evidence in view. Hypothetical preferences are not interchangeable with observed behavior or older versions' responses.

## 10. Sources

References support methodological choices and descriptions of the reference products. They do not establish validity for the original BUGTI items. Public sources were consulted on 2026-11-20.



* **\[S1] 16Personalities.** *Free Personality Test*. The accessible first-page content identifies 60 questions and seven response choices. [https://www.16personalities.com/free-personality-test](https://www.16personalities.com/free-personality-test) . Product introduction: [https://www.16personalities.com/](https://www.16personalities.com/) . Used for statement format and reference-product facts only.

* **\[S2] SBTI.** Public introduction and FAQ. [https://www.sbti.ai/](https://www.sbti.ai/) . Used for its stated length, entertainment positioning, and distinction between result-level H/M/L and answer-category count. No claim of independently verified three-choice input or access to its scoring algorithm is made.

* **\[S3] Revilla, M., Saris, W. E., and Krosnick, J. A.** *Choosing the Number of Categories in Agree-Disagree Scales*. The consulted full text is the **2009 RECSM Working Paper No. 5**, not the final journal text: [http://repositori.upf.edu/bitstream/10230/28305/1/RECSM-WP-005-Choosing%20the%20number%20of%20categories%20in%20agree-disagree%20scales.pdf](http://repositori.upf.edu/bitstream/10230/28305/1/RECSM-WP-005-Choosing%20the%20number%20of%20categories%20in%20agree-disagree%20scales.pdf) . Its category-labeling limitation is retained in this specification.

* **\[S4] Simms, L. J., Zelazny, K., Williams, T. F., and Bernstein, L. (2019).** *Does the number of response options matter? Psychometric perspectives using personality questionnaire data*. Psychological Assessment, 31(4), 557–566. PubMed abstract and bibliographic record: [https://pubmed.ncbi.nlm.nih.gov/30869956/](https://pubmed.ncbi.nlm.nih.gov/30869956/) . Used for the randomized comparison, precision findings, and distinct criterion-validity result.

* **\[S5] Boateng, G. O., Neilands, T. B., Frongillo, E. A., Melgar-Quiñonez, H. R., and Young, S. L. (2018).** *Best Practices for Developing and Validating Scales for Health, Social, and Behavioral Research: A Primer*. Frontiers in Public Health, 6:149. [https://pubmed.ncbi.nlm.nih.gov/29942800/](https://pubmed.ncbi.nlm.nih.gov/29942800/) . Content-review and cognitive-interview detail: [https://www.frontiersin.org/journals/public-health/articles/10.3389/fpubh.2018.00149/full#:\~:text=The%20rule%20of%20thumb%20has,the%20number%20of%20survey%20items](https://www.frontiersin.org/journals/public-health/articles/10.3389/fpubh.2018.00149/full#:~:text=The%20rule%20of%20thumb%20has,the%20number%20of%20survey%20items). .

* **\[S6] Stefana, A., and colleagues (2025).** *Psychological, psychiatric, and behavioral sciences measurement scales: best practice guidelines for their development and validation*. Frontiers in Psychology, 15:1494261. [https://pmc.ncbi.nlm.nih.gov/articles/PMC11798685/](https://pmc.ncbi.nlm.nih.gov/articles/PMC11798685/) . Used for ordinal analysis, item content, sample-size cautions, reliability, retest, missingness, and invariance guidance. Its clinical examples are methodological references, not a clinical purpose for BUGTI.

* **\[S7] Clark, L. A., and Watson, D. (2019).** *Constructing Validity: New Developments in Creating Objective Measuring Instruments*. Psychological Assessment, 31(12), 1412–1427. [https://pmc.ncbi.nlm.nih.gov/articles/PMC6754793/?term=%22Psychol%20Assess%22%5Bjour%5D](https://pmc.ncbi.nlm.nih.gov/articles/PMC6754793/?term=%22Psychol%20Assess%22%5Bjour%5D) . Used for construct coverage, midpoint semantics, response formats, reliability-versus-unidimensionality cautions, and validation across methods and translations.