import BinaryQuestion from "../presentational/Binary";
import LikertQuestion from "../presentational/Likert";
import SingleChoiceQuestion from "../presentational/SingleChoice";
import BinaryForm from "../presentational/BinaryForm";
import LikertForm from "../presentational/LikertForm";
import SingleChoiceForm from "../presentational/SingleChoiceForm";

const questionTypes = {
  "binary": {results: BinaryQuestion, form: BinaryForm},
  "likert": {results: LikertQuestion, form: LikertForm},
  "single choice": {results: SingleChoiceQuestion, form: SingleChoiceForm}
}

export default questionTypes;
