#!/usr/bin/python3

def pascal_triangle(n):
    """
    Generate Pascal's triangle with `n` rows.

    Parameters:
    - n (int): The number of rows in the Pascal's triangle to generate.

    Returns:
    - list of lists: A list of lists representing Pascal's triangle.
      Each sublist corresponds to a row in the triangle, with the
      first row containing a single element (1), and subsequent rows
      constructed by summing adjacent elements from the row above.

    Example:
    >>> pascal_triangle(5)
    [[1], [1, 1], [1, 2, 1], [1, 3, 3, 1], [1, 4, 6, 4, 1]]
    """
    if n <= 0:
        return []
    else:
        res = [[1]]
        for i in range(n - 1):
            temp = [0] + res[-1] + [0]
            row = []
            for j in range(len(res[-1]) + 1):
                row.append(temp[j] + temp[j + 1])
            res.append(row)
        return res
