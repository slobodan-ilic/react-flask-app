"""Home of the Prorator class."""


class Prorator:
    """Implementation of the `Prorator` service class.

    The class is a functional object. It only stores the request's payload, that it
    uses to calculate the output. It doesn't have any state (purely functional). The
    requested investment amounts that can be realized fully are executed first. The
    algorithm is executed recursively, until only the requests that _have_ to be
    prorated are left. The prorate algorithm is then applied to those requests and all
    of the results (prorated and realized fully) are grouped together.

    A production version of this algorighm would probably have to use sorting by
    requested amount as the first step (so that the investors most likely to fully
    realize their investments are encountered first). The algorithm would also then have
    the early exit strategy.
    """

    def __init__(self, payload):
        self._data = payload

    # --- API ---

    @property
    def output(self):
        """dict(string, float) => each investor's prorated investment amount."""

        # --- Detect early exit - no need to prorate
        if self._allocation >= self._requested:
            return {inv["name"]: inv["requested_amount"] for inv in self._investors}

        # --- Detect all investors that are capable to invest _all_ of their money
        # --- And update the remaining allocation amount. Recursively calculate the
        # --- remaining investors' amounts that still potentially need proration.
        if self._maxed_out_investors:
            return {
                **self.__class__(self._remaining_payload).output,
                **self._maxed_out_investors,
            }

        # --- Perform actual corrections of the amounts that have to be prorated.
        # --- This path signifies the recursion termination.
        return {
            inv["name"]: inv["average_amount"] / self._base * self._allocation
            for inv in self._investors
        }

    # --- Helper methods and properties ---

    @property
    def _allocation(self):
        """int/float - total allowed allocation."""
        return self._data["allocation_amount"]

    @property
    def _requested(self):
        """int/float - total requested amount."""
        return sum([inv["requested_amount"] for inv in self._investors])

    @property
    def _base(self):
        """int/float - denominator for the proration algorighm."""
        return sum([inv["average_amount"] for inv in self._data["investor_amounts"]])

    @property
    def _investors(self):
        """dict representing each investor's name and investment data."""
        return self._data["investor_amounts"]

    @property
    def _maxed_out_investors(self):
        """dict(str, float) of investors that can realize full requested amounts."""
        return {
            inv["name"]: inv["requested_amount"]
            for inv in self._investors
            if inv["average_amount"] / self._base * self._allocation
            > inv["requested_amount"]
        }

    @property
    def _remaining_payload(self):
        """dict representing remaining payload and allocation amount.

        This payload consists of what is left when all investors who're able to invest
        their full requested amounts are subtracted from the original allocation amount.
        """
        remaining_amount = self._allocation - sum(
            v for v in self._maxed_out_investors.values()
        )
        remaining_investors = [
            inv
            for inv in self._investors
            if inv["name"] not in self._maxed_out_investors
        ]
        return {
            "allocation_amount": remaining_amount,
            "investor_amounts": remaining_investors,
        }
