import type {
  FutureSelf,
  FutureSelfChatRequest,
} from "../../../../shared/types/futureSelf";

export type FutureSelfChatReasoner = (
  futureSelf: FutureSelf,
  question: string,
  context: FutureSelfChatRequest["context"],
) => Promise<string>;

export interface FutureSelfChatSource {
  futureSelf: FutureSelf;
  question: string;
  context: FutureSelfChatRequest["context"];
}

/**
 * Provider-independent conversation service for Future Self.
 *
 * The actual AI provider/reasoning implementation is injected.
 * This keeps Future Self independent from Grok or any other provider.
 */
export class FutureSelfChatService {
  private readonly reasoner: FutureSelfChatReasoner;

  constructor(reasoner: FutureSelfChatReasoner) {
    this.reasoner = reasoner;
  }

  async chat(source: FutureSelfChatSource): Promise<string> {
    const question = source.question.trim();

    if (!question) {
      throw new Error("Future Self question cannot be empty.");
    }

    return this.reasoner(
      source.futureSelf,
      question,
      source.context,
    );
  }
}
