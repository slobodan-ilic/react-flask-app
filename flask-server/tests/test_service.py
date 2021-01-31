"""Home of the service classes tests."""

import pytest

from services.prorator import Prorator


class TestProrator:
    def test_allocation_amount(self, simple_1_input_):
        assert Prorator(simple_1_input_)._allocation == 100

    def test_total_amount(self, simple_1_input_):
        assert Prorator(simple_1_input_)._requested == 125

    def test_base(self, simple_1_input_):
        assert Prorator(simple_1_input_)._base == 125

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
    def test_output(self, payload, expectation):
        assert Prorator(payload).output == expectation

    # --- fixtures ---

    @pytest.fixture
    def simple_1_input_(self):
        return {
            "allocation_amount": 100,
            "investor_amounts": [
                {"name": "Investor A", "requested_amount": 100, "average_amount": 100},
                {"name": "Investor B", "requested_amount": 25, "average_amount": 25},
            ],
        }
