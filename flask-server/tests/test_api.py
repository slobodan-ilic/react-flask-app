"""Home of the api tests."""

import api
import pytest


class TestAPI:
    """Group the API tests."""

    @pytest.mark.parametrize(
        "payload, expectation",
        (
            # Simple 1 input/output
            (
                {
                    "allocation_amount": 100,
                    "investor_amounts": [
                        {
                            "name": "Investor A",
                            "requested_amount": 100,
                            "average_amount": 100,
                        },
                        {
                            "name": "Investor B",
                            "requested_amount": 25,
                            "average_amount": 25,
                        },
                    ],
                },
                {"Investor A": 80, "Investor B": 20},
            ),
            # Simple 2 input/output
            (
                {
                    "allocation_amount": 200,
                    "investor_amounts": [
                        {
                            "name": "Investor A",
                            "requested_amount": 100,
                            "average_amount": 100,
                        },
                        {
                            "name": "Investor B",
                            "requested_amount": 25,
                            "average_amount": 25,
                        },
                    ],
                },
                {"Investor A": 100, "Investor B": 25},
            ),
            # Complex 1 input/output
            (
                {
                    "allocation_amount": 100,
                    "investor_amounts": [
                        {
                            "name": "Investor A",
                            "requested_amount": 100,
                            "average_amount": 95,
                        },
                        {
                            "name": "Investor B",
                            "requested_amount": 2,
                            "average_amount": 1,
                        },
                        {
                            "name": "Investor C",
                            "requested_amount": 1,
                            "average_amount": 4,
                        },
                    ],
                },
                {"Investor A": 97.96875, "Investor B": 1.03125, "Investor C": 1},
            ),
            # Complex 2 input/output
            (
                {
                    "allocation_amount": 100,
                    "investor_amounts": [
                        {
                            "name": "Investor A",
                            "requested_amount": 100,
                            "average_amount": 95,
                        },
                        {
                            "name": "Investor B",
                            "requested_amount": 1,
                            "average_amount": 1,
                        },
                        {
                            "name": "Investor C",
                            "requested_amount": 1,
                            "average_amount": 4,
                        },
                    ],
                },
                {"Investor A": 98, "Investor B": 1, "Investor C": 1},
            ),
        ),
    )
    def test_prorate_api(self, client_, payload, expectation):
        """Test if the prorate algorithm is executed correctly through API."""
        assert client_.post("/prorate", json=payload).json == expectation

    # --- fixtures ---

    @pytest.fixture
    def client_(self):
        api.app.config["TESTING"] = True
        with api.app.test_client() as client:
            yield client
