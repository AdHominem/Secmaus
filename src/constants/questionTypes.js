import BinaryQuestion from "../presentational/Binary";
import LikertQuestion from "../presentational/Likert";
import SingleChoiceQuestion from "../presentational/SingleChoice";
import FreeFormQuestion from "../presentational/FreeForm";
import BinaryForm from "../presentational/BinaryForm";
import LikertForm from "../presentational/LikertForm";
import SingleChoiceForm from "../presentational/SingleChoiceForm";
import FreeFormForm from "../presentational/FreeFormForm";


const questionTypes = {
  "binary": {results: BinaryQuestion, form: BinaryForm},
  "likert": {results: LikertQuestion, form: LikertForm},
  "single choice": {results: SingleChoiceQuestion, form: SingleChoiceForm},
  "freeform": {results: FreeFormQuestion, form: FreeFormForm}
};

export default questionTypes;
